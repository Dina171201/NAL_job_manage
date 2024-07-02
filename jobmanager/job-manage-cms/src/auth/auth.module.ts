import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthCommonService } from './auth-common.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from 'src/common/config/global.config';
import { AuthController } from './auth.controller';
import { JwtAuthenUserStrategy } from './jwt-authen.user.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    UtilsModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => ({
        secret: configService.get('auth.accessToken.secret'),
        signOptions: {
          algorithm: configService.get('auth.accessToken.algorithm'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    AuthCommonService,
    JwtAuthenUserStrategy,
  ],
})
export class AuthModule {}
