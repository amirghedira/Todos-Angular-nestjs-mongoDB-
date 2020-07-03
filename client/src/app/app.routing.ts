import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'todos',
        component: TodoComponent
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];