import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './user.model'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthService } from "src/auth/auth.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService, AuthService],
    exports: [UserService]
})
export class UserModule {

}