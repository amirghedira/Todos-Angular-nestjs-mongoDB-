import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class UserService {

    headers: HttpHeaders;
    token: string;
    private userCon = new BehaviorSubject(null);
    userConnected = this.userCon.asObservable();

    constructor(private http: HttpClient) {

        this.setSession()
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    }

    setSession() {

        this.token = localStorage.getItem('token')
    }
    userLogin(username: string, password: string) {

        return this.http.post('http://localhost:3000/user/login', { username, password })

    }
    getUsers() {

        return this.http.get('http://localhost:3000/user')
    }
    getConnectUser() {
        return this.http.get('http://localhost:3000/user/token', { headers: this.headers })
    }
    login(user: any) {
        this.userCon.next(user);
    }
    addUser(username: string, password: string, name: string, surname: string) {

        return this.http.post('http://localhost:3000/user', { username, password, name, surname }, { headers: this.headers })
    }
    deleteUser(userId: string) {
        return this.http.delete('http://localhost:3000/user/' + userId, { headers: this.headers })
    }
    updateUser(userId: string, username: string, name: string, surname: string, access: boolean) {
        return this.http.patch('http://localhost:3000/user/' + userId, { username, surname, name, access })
    }
    disconnectUser() {
        this.token = null;
        localStorage.clear()
    }


}