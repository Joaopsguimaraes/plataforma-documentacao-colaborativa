import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

@InputType()
export class SignupInputDto {
  @Field()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Senha muito fraca. Use maiúsculas, minúsculas, números e símbolos.',
    },
  )
  password: string;
}
