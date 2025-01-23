import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(
      {
        status: HttpStatus.CONFLICT,
        error: `Usuário com email ${email} já existe`,
        code: 'USER_ALREADY_EXISTS',
      },
      HttpStatus.CONFLICT,
    );
  }
}
