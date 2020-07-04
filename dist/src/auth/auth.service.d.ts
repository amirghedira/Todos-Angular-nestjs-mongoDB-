import { UserService } from 'src/users/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
