import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenUserGuard } from 'src/auth/jwt-authen.user.guard';

// import { JwtAuthenMerchantGuard } from '../../auth/guards/jwt-authen.merchant.guard';

export const IS_PUBLIC_KEY = Symbol();
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthenticateUser = () =>
  applyDecorators(UseGuards(JwtAuthenUserGuard));
export const CurrentAuthData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
