import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaServ: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaServ.user.create({
      data: createUserDto,
    });
    return user;
  }

  async getUser(email: string): Promise<User> {
    return await this.prismaServ.user.findUnique({
      where: {
        email,
      },
    });
  }
}
