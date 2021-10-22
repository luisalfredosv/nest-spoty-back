import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_KEY')
    });
  }

  async validate(validationPayload: {
    subject: string;
  }): Promise<User> {
    const { subject } = validationPayload;
    const user = this.usersService.getUser(subject);
    if (!user) throw new UnauthorizedException('Err sssdsd');
    return user;
  }
}