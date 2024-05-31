import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class SiginInResponce {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
