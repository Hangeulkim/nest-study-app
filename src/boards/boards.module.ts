import {Module} from '@nestjs/common';
import {BoardsController} from './boards.controller';
import {BoardsService} from './boards.service';
import {TypeORMExModule} from "../../configs/typeorm-ex.module";
import {BoardRepository} from "./board.repository";

@Module({
    imports: [
        TypeORMExModule.forCustomRepository([BoardRepository]),
    ],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule {
}
