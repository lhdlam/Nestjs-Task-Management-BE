import { Controller, Post, Get, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard} from '@nestjs/passport'
import { GetUser } from './get-user.decorator';
import { User } from './use.entity';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}


  @Post('signup')
  async sigUup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto ):Promise<void>{
    return  this.authService.signUp(authCredentialsDto)
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto ):Promise<{accessToken: string}>{
    return await this.authService.signIn(authCredentialsDto)
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User){
    console.log(user);
  }
}
