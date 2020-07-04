import { Component, OnInit } from "@angular/core";
import { UserService } from '../service/user.service';
import { ParamMap, ActivatedRoute } from '@angular/router';



@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    userProfile: any;
    ownProfile: boolean;
    loading: boolean
    selectedAccess: string;
    editingUsername: boolean;
    editingName: boolean;
    editingSurname: boolean;
    editAccess: boolean;

    constructor(private userService: UserService, private route: ActivatedRoute) {

        this.loading = true;
    }
    onEditUserName() {
        this.editingUsername = !this.editingUsername
    }
    onEditName() {
        this.editingName = !this.editingName
    }
    onEditSurname() {
        this.editingSurname = !this.editingSurname
    }
    onEditAccess() {
        this.editAccess = !this.editAccess
    }
    selectChanged() {
        console.log(this.selectedAccess)
    }
    ngOnInit() {

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.userService.getUser(paramMap.get('id')).subscribe((user: any) => {
                    this.userProfile = user
                    this.userService.getConnectUser().subscribe((connectedUser: any) => {
                        this.ownProfile = connectedUser._id === user._id
                        this.loading = false
                    })
                })
            }

        });


    }
}