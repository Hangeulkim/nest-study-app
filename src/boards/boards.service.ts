import {Injectable, NotFoundException} from '@nestjs/common';
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";
import {User} from "../auth/user.entity";

@Injectable()
export class BoardsService {
    constructor(private boardRepository: BoardRepository,) {
    }

    async getAllBoards(user: User): Promise<Board[]> {
        return this.boardRepository.findBy({user: {id: user.id}});
    }

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }
    //

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {

        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const {title, description} = createBoardDto
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     }
    //
    //     this.boards.push(board)
    //     return board;
    // }
    //

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({id: id});

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //
    //     if (!found) {
    //         throw new NotFoundException();
    //     }
    //
    //     return found
    // }
    //

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({id, user: {id: user.id}});

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        console.log(`result ${id}`);
    }

    // deleteBoard(id: string): void {
    //     this.boards = this.boards.filter((board) => board.id != id);
    // }
    //

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
