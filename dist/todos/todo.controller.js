"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const jwt_auth_gard_1 = require("../auth/jwt-auth.gard");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getTodos() {
        return await this.todoService.getTodos();
    }
    async getUserTodos(req) {
        return await this.todoService.getUserTodos(req.user._id);
    }
    async getTodo(todoId) {
        return await this.todoService.getTodo(todoId);
    }
    async addTodo(req, userId, title, description) {
        return await this.todoService.addTodo(req.user._id, userId, title, description);
    }
    async deleteTodo(todoId, req) {
        this.todoService.deleteTodo(todoId, req.user._id);
    }
    async updateState(todoId, state) {
        return await this.todoService.editTodoState(todoId, state);
    }
    async updateTodo(req, todoId, title, description) {
        return await this.todoService.editTodo(todoId, req.user._id, title, description);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodos", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Get('/user'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getUserTodos", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodo", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Request()),
    __param(1, common_1.Body('userid')),
    __param(2, common_1.Body('title')),
    __param(3, common_1.Body('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "addTodo", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Patch('state/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateState", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body('title')),
    __param(3, common_1.Body('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodo", null);
TodoController = __decorate([
    common_1.Controller('todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map