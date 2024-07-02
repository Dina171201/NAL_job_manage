import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from 'src/common/config/global.config';
import { JwtAuthPayload } from './jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthCommonService {
  constructor(
    private configService: ConfigService<GlobalConfig>,
    private jwtService: JwtService,
  ) {}

  generateAccessToken(payload: JwtAuthPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth.accessToken.expiresTime'),
      secret: this.configService.get('auth.accessToken.secret'),
    });
  }

  generateRefreshToken(payload: JwtAuthPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth.refreshToken.expiresTime'),
      secret: this.configService.get('auth.refreshToken.secret'),
    });
  }
}
