import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authServ: AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@GetUser() user: User){
        return this.authServ.login(user)
    }

    @Post('signin')
    async signin(@Body() createUserDto: CreateUserDto){
        await this.authServ.createUser(createUserDto)
    }



}
