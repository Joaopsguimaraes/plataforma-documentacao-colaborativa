import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupInputDto } from './dto/signup-input';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SigninInput } from './dto/signin-input';
import type { SignResponse } from './dto/sign-response';
import { jwtConstants } from './constants/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(signupInput: SignupInputDto): Promise<SignResponse> {
    const existingUser = await this.userService
      .findByEmail(signupInput.email)
      .catch(() => null);

    if (existingUser) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const user = await this.userService.create(signupInput);

    const payload = { sub: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    return {
      accessToken,
      user,
    };
  }

  async signin(signinInput: SigninInput): Promise<SignResponse> {
    const user = await this.userService.findByEmail(signinInput.email);

    const isPasswordValid = await bcrypt.compare(
      signinInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    return {
      accessToken,
      user,
    };
  }
}
