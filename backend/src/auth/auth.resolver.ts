import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInputDto } from './dto/signup-input';
import { SignResponse } from './dto/sign-response';
import { SigninInput } from './dto/signin-input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  signup(@Args('signupInput') signup: SignupInputDto) {
    return this.authService.signup(signup);
  }

  @Mutation(() => SignResponse)
  signin(@Args('signinInput') signin: SigninInput) {
    return this.authService.signin(signin);
  }
}
