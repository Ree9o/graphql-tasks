import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { User as UserModel } from './models/user.model';
import { CreateUserInput } from './dto/createUser.input';
import { GetUserArgs } from './dto/getUser.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Args() //@ArgsType()をDTOで使用している場合はArgsデコレーターの引数に名前は必要ない
    getUserArgs: GetUserArgs,
  ): Promise<User> {
    return await this.userService.getUser(getUserArgs.email);
  }
}
