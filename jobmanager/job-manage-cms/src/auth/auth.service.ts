import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UtilsService } from 'src/utils/utils.service';
import { JwtAuthPayload } from './jwt-payload.interface';
import { AuthCommonService } from './auth-common.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private readonly utilsService: UtilsService,
    private readonly authCommonService: AuthCommonService,
  ) {}
  async register(dto: RegisterDto) {
    const { userName, firstName, lastName, password } = dto;
    const user = await this.userRepo.findOneBy({
      userName: userName,
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }

    // TODO: Encrypt password
    const newUser = this.userRepo.create({
      userName,
      firstName,
      lastName,
      passWord: await this.utilsService.encryptText(password, 10),
    });
    await this.userRepo.save(newUser);

    return newUser;
  }

  async login(dto: LoginDto) {
    const { userName, password } = dto;
    const user = await this.userRepo.findOneBy({
      userName: userName,
    });
    if (!user) {
      throw new Error('User not exists');
    }

    const isMatch = await this.utilsService.compareHash(
      password,
      user.passWord,
    );
    if (!isMatch) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    const payload: JwtAuthPayload = { userId: user.id };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }
  async getProfile(id: number) {
    // const user = this.userRepo.findOneBy({ id });
    const [user] = await this.userRepo.find({ where: { id: id } });
    return user;
  }
}
