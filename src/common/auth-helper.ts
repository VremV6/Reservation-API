import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
  userId: string;
  username: string;
}
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
