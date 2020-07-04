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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_gard_1 = require("../auth/jwt-auth.gard");
const auth_service_1 = require("../auth/auth.service");
const local_auth_gard_1 = require("../auth/local-auth.gard");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async getUsers() {
        return await this.userService.getUsers();
    }
    async getUserWithToken(req) {
        return await this.userService.getUserByToken(req.user._id);
    }
    async getUser(userId) {
        return await this.userService.getUser(userId);
    }
    async addUser(username, password, name, surname) {
        return await this.userService.addUser(username, password, name, surname);
    }
    async login(req) {
        return await this.authService.login(req.user);
    }
    async updatePassword(req, userid, newPassword, oldPassword) {
        return await this.userService.updatePassword(req.user._id, userid, oldPassword, newPassword);
    }
    async updateUser(req, userid, username, name, surname, access) {
        return await this.userService.editUser(req.user._id, userid, username, name, surname, access);
    }
    async deleteUser(userid, req) {
        return await this.userService.deleteUser(userid, req.user._id);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Get('/token'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserWithToken", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('username')),
    __param(1, common_1.Body('password')),
    __param(2, common_1.Body('name')),
    __param(3, common_1.Body('surname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    common_1.UseGuards(local_auth_gard_1.LocalAuthGuard),
    common_1.Post('/login'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Patch('/password/:id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body('newPassword')),
    __param(3, common_1.Body('oldPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body('username')),
    __param(3, common_1.Body('name')),
    __param(4, common_1.Body('surname')),
    __param(5, common_1.Body('access')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_gard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map