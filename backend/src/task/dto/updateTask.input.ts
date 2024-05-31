import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional() //値が存在しない場合にもバリデーションされてしまうため、null許容するfieldにはつける(値が存在する場合のみ作動する)
  name?: string;
  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
  @Field({ nullable: true })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @Field({ nullable: true })
  description?: string;
}
