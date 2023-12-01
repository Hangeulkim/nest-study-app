import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credential.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository,
                private jwtService: JwtService) {
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOneBy({username: username});

        if (user && (await user.validatePassword(password))) {
            //유저 토큰 생성 (secret + payload)
            const payload = {username}
            const accessToken = this.jwtService.sign(payload);
            return {accessToken};
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
