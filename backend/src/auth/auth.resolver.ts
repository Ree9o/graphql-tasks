import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SiginInResponce } from './dto/siginInResponce';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignInInput } from './dto/signIn.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SiginInResponce)
  @UseGuards(GqlAuthGuard)
  async signIn(
    @Args(
      'signInInput', // gql-auth.gurdsのgetArgs()とチェーンしている名前と合わせる
    )
    signInInput: SignInInput,
    @Context() context: any,
  ) {
    return await this.authService.signIn(context.user); //localstorategy.tsのreturn userが格納される
  }
}
