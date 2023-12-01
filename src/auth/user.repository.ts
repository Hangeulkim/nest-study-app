import {CustomRepository} from "../../configs/typeorm-ex.decorator";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {AuthCredentialsDto} from "./dto/auth-credential.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const salt = await bcrypt.genSalt();
        const {username, password} = authCredentialsDto;

        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({username, password: hashedPassword});
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing name');
            } else {
                throw new InternalServerErrorException();
            }
            console.log(error);
        }

    }
}