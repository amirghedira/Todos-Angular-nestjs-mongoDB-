import { Controller, Get, Param, Post, Body, Patch, Delete } from "@nestjs/common";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

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
    @Post('/login')
    async userLogin(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return await this.userService.userLogin(username, password)
    }
    @Patch(':id')
    async updateUser(
        @Param('id') userid: string,
        @Body('username') username: string,
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('access') access: string
    ) {
        return await this.userService.editUser(userid, username, name, surname, access)

    }
    @Delete(':id')
    async deleteUser(@Param('id') userid: string) {

        return await this.userService.deleteUser(userid)

    }
    @Patch('/password/:id')
    async updatePassword(
        @Param('id') userid: string,
        @Body('newPassword') newPassword: string
    ) {
        return await this.userService.updatePassword(userid, newPassword)
    }


}