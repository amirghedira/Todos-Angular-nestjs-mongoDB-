import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.model'
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {

    constructor(@InjectModel('User') private UserModel: Model<User>) { }

    getUsers = async () => {

        const users = await this.UserModel.find()

        return users;

    }
    addUser = async (username: string, password: string, name: string, surname: string) => {

        const users = await this.UserModel.find()
        const filtredUsers = users.filter(user => { return user.username === username })
        let accessAdmin = false;
        if (users.length > 1) accessAdmin = true;
        if (filtredUsers.length == 0) {
            const hashedpass = await bcrypt.hash(password, 11);
            const newUser = new this.UserModel({
                username,
                surname,
                name,
                password: hashedpass,
                adminAccess: accessAdmin
            })
            const createduser = await newUser.save()
            return createduser._id;
        }
        throw new HttpException('user already exists', HttpStatus.CONFLICT)
    }
    getUser = async (userid: string) => {

        const user = await this.UserModel.findOne({ _id: userid })
        if (user)
            return user

        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    getUserByUsrname = async (username: string) => {

        const user = await this.UserModel.findOne({ username: username })
        if (user)
            return user

        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    getUserByToken = async (userId: string) => {

        const user = await this.UserModel.findById(userId).exec()
        if (user)
            return user
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    editUser = async (senderId: string, userId: string, username: string, name: string, surname: string, access: string) => {

        const user = await this.UserModel.findOne({ _id: senderId }).exec()
        if (user && (user.adminAccess || user._id === userId)) {
            await this.UserModel.updateOne({ _id: userId }, { $set: { username: username, name: name, surname: surname, adminAccess: access } })
            return { message: 'user successfully updated' }
        }

        throw new HttpException('username already exists', HttpStatus.CONFLICT)
    }
    updatePassword = async (senderId: string, userId: string, newPassword: string) => {

        const user = await this.UserModel.findById(senderId)
        if (user && (user.adminAccess || user._id === userId)) {
            const hashedpass = await bcrypt.hash(newPassword, 11);
            user.password = hashedpass;
            return await user.save()
        }
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    deleteUser = async (userId: string, senderId: string) => {

        const user = await this.UserModel.findOne({ _id: senderId })
        if (user && (user.adminAccess || user._id === userId)) {
            await this.UserModel.deleteOne({ _id: userId })
            return { message: 'user successfully deleted' }
        }
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
}