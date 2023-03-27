
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.intertface';
import { User } from './use.entity';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET  || config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload):Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({where: {username}});

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}