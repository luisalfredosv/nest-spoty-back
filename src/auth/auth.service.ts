import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { AuthUserDto } from './dto/authUser.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const salt: string = genSaltSync(15);
    const hash: string = hashSync(password, salt);

    const newUser: CreateUserDto = {
      ...createUserDto,
      password: hash,
    };

    await this.usersService.createUser(newUser);
    return;
  }

  async getUser(authUserDto: AuthUserDto): Promise<User> {
    const { email } = authUserDto;
    return await this.usersService.getUser(email);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(email);

    if (user && compareSync(password, user.password)) {
      return user;
    }

    throw new UnauthorizedException('Sin acceso!');
  }

  generateAccessToken(user: User) {
    const payload: JwtSignOptions = {
      subject: String(user.email),
    };
    return this.jwtService.sign(payload);
  }

  login(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
    };
  }
}
