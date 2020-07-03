import { Controller, Get, Param, Post, Body, Delete, Patch, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TodoService } from './todo.service'
import { JwtAuthGuard } from "src/auth/jwt-auth.gard";
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }


    @Get()
    async getTodos() {
        return await this.todoService.getTodos()
    }

    @Get(':id')
    async getTodo(@Param('id') todoId) {

        return await this.todoService.getTodo(todoId)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addTodo(
        @Request() req: any,
        @Body('title') title: string,
        @Body('description') description: string,
    ) {
        return await this.todoService.addTodo(req.user._id, title, description)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTodo(@Param('id') todoId: string, @Request() req) {

        this.todoService.deleteTodo(todoId, req.user._id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateTodo(
        @Request() req: any,
        @Param('id') todoId: string,
        @Body('title') title: string,
        @Body('description') description: string,

    ) {
        return await this.todoService.editTodo(todoId, req.user._id, title, description)
    }

}