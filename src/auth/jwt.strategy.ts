import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "./user.entity";
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userRepository: UserRepository) {
        super({
                secretOrKey: jwtConfig.secret,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            }
        );
    }

    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepository.findOneBy({username: username});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}