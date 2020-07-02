import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { TodoService } from './todo.service'


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
    @Post()
    async addTodo(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('userid') userId: string
    ) {
        return await this.todoService.addTodo(userId, title, description)
    }
    @Delete(':id')
    async deleteTodo(@Param('id') todoId: string) {

        this.todoService.deleteTodo(todoId)
    }
    @Patch(':id')
    async updateTodo(
        @Param('id') todoId: string,
        @Body('title') title: string,
        @Body('description') description: string

    ) {
        return await this.todoService.editTodo(todoId, title, description)
    }

}