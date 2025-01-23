import { SignupInputDto } from './signup-input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(SignupInputDto) {
  @Field(() => String)
  id: string;
}
