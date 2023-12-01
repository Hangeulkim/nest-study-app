import {Module} from '@nestjs/common';
import {typeORMConfig} from "../configs/typeorm.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BoardsModule} from "./boards/boards.module";
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        BoardsModule,
        AuthModule
    ],
})
export class AppModule {
}
