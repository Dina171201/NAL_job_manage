import { HttpException, HttpStatus } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport';

export const handleRequest: IAuthGuard['handleRequest'] = (
  err: any,
  user: any,
) => {
  if (err || !user) {
    throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
  }
  return user;
};
