import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Todo } from './todo.model'
import { Model } from 'mongoose'
@Injectable()
export class TodoService {

    constructor(@InjectModel('Todo') private TodoModel: Model<Todo>) { }

    getTodos = async () => {

        const todos = await this.TodoModel.find();
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
        return createdTodo._id

    }
    deleteTodo = async (todoid: string) => {

        await this.TodoModel.deleteOne({ _id: todoid })
        return;

    }
    editTodo = async (todoId: string, title: string, description: string) => {

        await this.TodoModel.updateOne({ _id: todoId }, { $set: { title: title, description: description } })
        return;

    }

}