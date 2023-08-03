import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/users/models/user.model';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@CurrentUser()user: User, @Res({passthrough: true,}) response: Response){
        await this.authService.login(user, response);
        response.send(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    isAuthenticated(){
        return true;
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Res({passthrough: true}) response:Response) {
        return this.authService.logout(response);
        response.json({});        
    }

}
