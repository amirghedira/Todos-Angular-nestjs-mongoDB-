import { Controller, Get, Param, Post, Body, Patch, Delete, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.gard";


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

    @Get()
    async getUsers() {

        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') userId: string) {
        return await this.userService.getUser(userId)
    }

    @Post()
    async addUser(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('name') name: string,
        @Body('surname') surname: string) {

        return await this.userService.addUser(username, password, name, surname)
    }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {

        return this.authService.login(req.user)

    }


    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateUser(
        @Request() req: any,
        @Body('username') username: string,
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('access') access: string
    ) {
        return await this.userService.editUser(req.user._id, username, name, surname, access)

    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') userid: string) {

        return await this.userService.deleteUser(userid)

    }
    @UseGuards(JwtAuthGuard)
    @Patch('/password')
    async updatePassword(
        @Request() req: any,
        @Body('newPassword') newPassword: string
    ) {
        return await this.userService.updatePassword(req.user._id, newPassword)
    }


}