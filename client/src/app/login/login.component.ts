import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { TodoService } from '../service/todo.service';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

    username: string;
    password: string;
    constructor(private router: Router, private userService: UserService, private todoService: TodoService) { }
    ngOnInit() {
        if (localStorage.getItem('token'))
            this.router.navigate(['/todos'])
    }
    onConnect() {
        this.userService.userLogin(this.username, this.password).subscribe(((response: any) => {
            localStorage.setItem('token', response.access_token)
            this.userService.setSession()
            this.todoService.setSession()
            this.userService.login(response.access_token)
            this.router.navigate(['/todos']);
        }), (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid username or password'
            })
        })

    }
}