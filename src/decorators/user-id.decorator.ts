import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authorizantionToLoginPayload } from '../utils/base-64-converter';

export const TokenUserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizantionToLoginPayload(authorization);

  return loginPayload.userid;
});
