import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(
        @Body() authCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signIn')
    async signIn(
        @Body() authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ access_token: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
