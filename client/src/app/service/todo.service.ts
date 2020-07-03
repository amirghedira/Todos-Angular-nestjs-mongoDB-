import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()

export class TodoService {

    headers: HttpHeaders;
    token: string;

    constructor(private http: HttpClient) {
        this.setSession()
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    }

    setSession() {

        this.token = localStorage.getItem('token')
    }

    getTodos() {

        return this.http.get('http://localhost:3000/todo')
    }
    addTodo(title: string, description: string) {

        return this.http.post('http://localhost:3000/todo', { title, description }, { headers: this.headers })
    }
    deleteTodo(todoId: string) {
        return this.http.delete('http://localhost:3000/todo/' + todoId, { headers: this.headers })
    }
    updateTodo(todoId: string, title: string, description: string) {
        return this.http.patch('http://localhost:3000/todo/' + todoId, { title, description }, { headers: this.headers })
    }


}