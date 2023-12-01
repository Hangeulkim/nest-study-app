import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatusValidationPipe} from "./pipes/board-status-validation.pipe";
import {BoardStatus} from "./board-status.enum";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
    private logger = new Logger('BoardController');

    constructor(private boardsService: BoardsService) {
    }

    @Get()
    async getAllBoards(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }

    // @Get("/")
    // getAllBoards(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    //

    @Get(':/id')
    async getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    // @Get("/:id")
    // getBoardById(@Param("id") id: string): Board {
    //     const found = this.boardsService.getBoardById(id);
    //
    //     return found;
    // }
    //
    @Post()
    @UsePipes(ValidationPipe)
    async createBoard(@Body() createBoardDto: CreateBoardDto,
                      @GetUser() user: User): Promise<Board> {
        this.logger.verbose(`User ${user.username} creating a new board. 
        Payload: ${JSON.stringify(createBoardDto)}`);
        const board = this.boardsService.createBoard(createBoardDto, user)
        return board
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     const board = this.boardsService.createBoard(createBoardDto)
    //     return board
    // }
    //

    @Delete("/:id")
    async deleteBoard(@Param("id", ParseIntPipe) id: number,
                      @GetUser() user: User): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    // @Delete("/:id")
    // deleteBoard(@Param("id") id: string): void {
    //     this.boardsService.deleteBoard(id)
    // }
    //

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status)
    }

    // @Patch("/:id/status")
    // updateBoardStatus(
    //     @Param("id") id: string,
    //     @Body("status", BoardStatusValidationPipe) status: BoardStatus
    // ): Board {
    //     return this.boardsService.updateBoardStatus(id, status)
    // }
}
