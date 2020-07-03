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
    constructor(private router: Router, private readonly userService: UserService, private readonly todoService: TodoService) { }
    connectedUser;
    ngOnInit() {

        if (this.userService.token)
            this.userService.getConnectUser().subscribe((result: any) => {
                this.connectedUser = result.user
                this.todoService.getTodos().subscribe((response: any) => {
                    this.todos = response;
                })


            })
        else
            this.router.navigate(['/login'])

    }
    onPost() {
        this.todoService.addTodo(this.title, this.description).subscribe((response: any) => {
            this.todos.push(response)
            this.title = ''
            this.description = ''
        })
    }
    transformDate(date) {

        return new Date(date).toDateString()

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