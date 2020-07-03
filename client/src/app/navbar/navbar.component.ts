import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {

    status: boolean;
    user: any;
    constructor(private router: Router, private userService: UserService) {
        this.status = false;
        this.userService.userConnected.subscribe((token) => {

            this.userService.getConnectUser().subscribe((user: any) => {
                if (user) {
                    this.status = true
                    this.user = user
                }
                else
                    this.status = false

            })

        });

    }
    ngOnInit() {
        if (this.userService.token)
            this.userService.getConnectUser().subscribe((user: any) => {
                if (user) {
                    this.status = true
                    this.user = user
                }
                else
                    this.status = false

            })

    }
    onDisconnect() {
        this.userService.disconnectUser();
        this.status = false;
        this.router.navigate(['/login'])
    }

}