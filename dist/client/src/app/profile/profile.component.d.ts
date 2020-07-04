import { OnInit } from "@angular/core";
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
export declare class ProfileComponent implements OnInit {
    private userService;
    private route;
    userProfile: any;
    ownProfile: boolean;
    loading: boolean;
    selectedAccess: string;
    editingUsername: boolean;
    editingName: boolean;
    editingSurname: boolean;
    editAccess: boolean;
    constructor(userService: UserService, route: ActivatedRoute);
    onEditUserName(): void;
    onEditName(): void;
    onEditSurname(): void;
    onEditAccess(): void;
    selectChanged(): void;
    ngOnInit(): void;
}
