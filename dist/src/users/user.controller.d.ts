import { UserService } from "./user.service";
import { AuthService } from "src/auth/auth.service";
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    getUsers(): Promise<any>;
    getUserWithToken(req: any): Promise<any>;
    getUser(userId: string): Promise<any>;
    addUser(username: string, password: string, name: string, surname: string): Promise<any>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    updatePassword(req: any, userid: string, newPassword: string, oldPassword: string): Promise<any>;
    updateUser(req: any, userid: string, username: string, name: string, surname: string, access: string): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
    deleteUser(userid: string, req: any): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
}
