import { TodoService } from './todo.service';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getTodos(): Promise<any>;
    getUserTodos(req: any): Promise<any>;
    getTodo(todoId: any): Promise<any>;
    addTodo(req: any, userId: string, title: string, description: string): Promise<any>;
    deleteTodo(todoId: string, req: any): Promise<void>;
    updateState(todoId: string, state: boolean): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
    updateTodo(req: any, todoId: string, title: string, description: string): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
}
