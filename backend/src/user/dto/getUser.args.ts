import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType() //Queryの場合はInputTypeではなくこっち
export class GetUserArgs {
  @Field()
  @IsEmail()
  email: string;
}
