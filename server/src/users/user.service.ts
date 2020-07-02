import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.model'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
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
    userLogin = async (username: string, password: string) => {

        const user = await this.UserModel.findOne({ username: username })
        if (user) {
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                const token = await jwt.sign({
                    _id: user._id,
                    username: user.username,
                }, 'nestapisecretjwtkey')

                return token;
            }
            throw new HttpException('Auth failed!', HttpStatus.UNAUTHORIZED)

        }
        throw new HttpException('Auth failed', HttpStatus.UNAUTHORIZED)
    }
    editUser = async (userid: string, username: string, name: string, surname: string, access: string) => {

        const user = await this.UserModel.findOne({ $and: [{ username: username }, { id: { _not: { $regex: userid } } }] })
        if (!user)
            return await this.UserModel.updateOne({ _id: userid }, { $set: { username: username, name: name, surname: surname, adminAccess: access } })

        throw new HttpException('username already exists', HttpStatus.CONFLICT)
    }
    updatePassword = async (userid: string, newPassword: string) => {

        const user = await this.UserModel.findById(userid)
        if (user) {
            const hashedpass = await bcrypt.hash(newPassword, 11);
            user.password = hashedpass;
            return await user.save()
        }
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    deleteUser = async (userid: string) => {

        const user = await this.UserModel.findOne({ _id: userid })
        if (user)
            return this.UserModel.deleteOne({ _id: userid })

        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
}