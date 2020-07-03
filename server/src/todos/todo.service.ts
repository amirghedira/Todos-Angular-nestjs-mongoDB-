import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Todo } from './todo.model'
import { Model } from 'mongoose'
import { UserService } from "src/users/user.service";
@Injectable()
export class TodoService {

    constructor(@InjectModel('Todo') private TodoModel: Model<Todo>, private userService: UserService) { }

    getTodos = async () => {

        const todos = await this.TodoModel.find().populate('userid').exec();
        return todos
    }
    getTodo = async (todoId: string) => {

        const todo = await this.TodoModel.find({ _id: todoId })
        return todo
    }
    addTodo = async (userid: string, title: string, desc: string) => {

        const newTodo = new this.TodoModel({
            userid: userid,
            title: title,
            description: desc,
            date: new Date().toISOString()
        })
        const createdTodo = await newTodo.save();
        const todo = await this.TodoModel.findById(createdTodo._id).populate('userid')
        return todo


    }
    deleteTodo = async (todoid: string, userid: string) => {

        const user = await this.userService.getUser(userid)
        const todo = await this.TodoModel.findById(todoid)
        if (todo)
            if (user.adminAccess || user._id === todo.userid) {

                await this.TodoModel.deleteOne({ _id: todoid })
                return { message: 'todo successfully deleted' }
            }
            else
                throw new HttpException('access denied', HttpStatus.FORBIDDEN);

        throw new HttpException('todo not found', HttpStatus.NOT_FOUND)

    }
    editTodo = async (todoId: string, userid: string, title: string, description: string) => {

        const user = await this.userService.getUser(userid)
        const todo = await this.TodoModel.findById(todoId)
        if (todo)
            if (user.adminAccess || user._id === todo.userid) {

                todo.title = title;
                todo.description = description;
                await todo.save()
                return { message: 'todo successfully updated' }
            }
            else
                throw new HttpException('access denied', HttpStatus.FORBIDDEN);

        throw new HttpException('todo not found', HttpStatus.NOT_FOUND)

    }

}