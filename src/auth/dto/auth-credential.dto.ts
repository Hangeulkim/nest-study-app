import {IsString, Length, Matches} from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @Length(4, 20)
    username: string;

    @IsString()
    @Length(4, 20)
    //영어랑 숫자만 가능
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;
}