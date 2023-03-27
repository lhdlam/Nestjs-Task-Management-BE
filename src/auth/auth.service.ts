import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.intertface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService, 

    ){}
  
  private logger = new Logger("Auth Service")
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{accessToken:string}>{
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);
    if(!username){
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = {username};
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`JWT generated JWT Token with payload ${JSON.stringify(payload)}`)
    return {accessToken};
  }
}

