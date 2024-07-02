import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { GlobalConfig } from 'src/common/config/global.config';
import { UserRepository } from './user.repository';
import { JwtAuthPayload } from './jwt-payload.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAuthenUserStrategy extends PassportStrategy(
  Strategy,
  'jwt-authen-user',
) {
  constructor(
    private readonly userRepo: UserRepository,
    configService: ConfigService<GlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('auth.accessToken.secret'),
      algorithms: [configService.get('auth.accessToken.algorithm')],
    });
  }
  async validate(payload: JwtAuthPayload) {
    const { userId } = payload;
    const user = await this.userRepo.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
