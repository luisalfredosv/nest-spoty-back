// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { AuthenticationError } from 'apollo-server-express';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// import { AuthService } from '../auth.service';
// import { UserService } from 'src/user/user.service';
// import { User } from 'src/user/user.schema';

// @Injectable()
// export class RefreshJwtStrategy extends PassportStrategy(
//   Strategy,
//   'refreshToken',
// ) {
//   constructor(
//     private configService: ConfigService,
//     private userService: UserService,
//     private authService: AuthService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>('REFRESH_TOKEN_KEY'),
//     });
//   }

//   async validate(validationPayload: {
//     subject: string;
//     aud: string;
//     iss: string;
//     sub: string;
//   }): Promise<User> {
//     const { sub: id } = validationPayload;
//     const user: User = await this.userService.getUserById(id);
//     if (!user) throw new AuthenticationError('');

//     return user;
//   }
// }
