import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

@ObjectType()
export class Task {
  @Field(() => Int) // Intに変換
  id: number;
  @Field()
  name: string;
  @Field()
  dueDate: string;
  @Field()
  status: Status;

  @Field({ nullable: true }) // null許容
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
