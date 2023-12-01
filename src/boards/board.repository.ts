import {Repository} from "typeorm";
import {Board} from "./board.entity";
import {CustomRepository} from "../../configs/typeorm-ex.decorator";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";
import {User} from "../auth/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;


        const board: Board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board);

        return board;
    }
}