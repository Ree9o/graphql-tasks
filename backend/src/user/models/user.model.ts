import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  email: string;
  @HideField() // client（gql）から取得できなくする
  password: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
