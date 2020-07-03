import { OnInit, Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

    todos: any;
    title: string;
    description: string;
    toEditId: string;
    editDescription: string;
    editTitle: string;
    users: any;
    constructor(private router: Router, private readonly userService: UserService, private readonly todoService: TodoService) { }
    connectedUser;
    ngOnInit() {

        if (this.userService.token) {
            this.userService.getConnectUser().subscribe((user: any) => {
                this.connectedUser = user
                this.userService.getUsers().subscribe((users: any) => {
                    this.users = users.filter(usr => { return usr._id != user._id })
                })
            })
            this.todoService.getTodos().subscribe((todos: any) => {
                this.todos = todos;
            })
        }

        else
            this.router.navigate(['/login'])

    }
    onPost() {
        if (this.title != '' && this.description != this.description)
            this.todoService.addTodo(this.title, this.description).subscribe((response: any) => {
                this.todos.push(response)
                this.title = ''
                this.description = ''
            })
    }
    transformDate(date) {

        return new Date(date).toDateString()

    }
    checkAdminAccess() {
        console.log(this.connectedUser)
        return this.connectedUser.adminAccess;
    }
    onClickEditTodo(todoid) {
        this.toEditId = todoid
    }
    onEditTodo() {
        this.todoService.updateTodo(this.toEditId, this.editTitle, this.editDescription).subscribe(response => {
            const index = this.todos.findIndex(todo => { return todo._id === this.toEditId })
            this.todos[index].title = this.editTitle;
            this.todos[index].description = this.editDescription;

        })
    }
    onDeleteTodo(todoid: string) {
        this.todoService.deleteTodo(todoid).subscribe(response => {
            this.todos = this.todos.filter(todo => { return todo._id !== todoid })
        })
    }
    onDeleteUser(userid: string) {
        this.userService.deleteUser(userid).subscribe(response => {

        }, error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'you dont have the access'
            })
        })
    }
}