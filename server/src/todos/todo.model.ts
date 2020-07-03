import * as mongoose from 'mongoose'


export const TodoSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: new Date().toISOString() },
    completed: { type: Boolean, default: false }
})

export interface Todo {
    _id: string;
    userid: string;
    title: string;
    description: string;
    date: Date
}