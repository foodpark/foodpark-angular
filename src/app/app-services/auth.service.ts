import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {AuthData} from './auth-data.module';

@Injectable({providedIn: 'root'})
export class AuthService {
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();

    private token: string;
    private userrole: string;
    private username: String;
    private timerReference;
    isTimeout: boolean;

    loginTimeout() {
        this.isTimeout = true;
    }

    initiateLoginTimer() {
        this.timerReference = setTimeout(() => {
            this.loginTimeout();
        }, 600000);
    }

    constructor(private http: HttpClient, private router: Router) {
    }

    getToken() {
        return this.token;
    }

    getUserRole() {
        return this.userrole;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getUserName() {
        return this.username;
    }

    login(usrname: string, pwd: string) {
        const authData: AuthData = {username: usrname, password: pwd};
        this.http.post<{ token: string }>('https://api.instamarkt.co/auth/login', authData)
            .subscribe(response => {
            const token = response.token;
            this.token = token;

            if (token) {
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.userrole = response['user']['role'].toLowerCase();
                this.username = response['user']['username'];

                switch (this.userrole) {
                    case 'admin':
                        this.router.navigate(['/admin']);
                        break;
                    case 'customer':
                        this.router.navigate(['/customer']);
                        break;
                    case 'owner':
                        this.router.navigate(['/owner']);
                        break;
                    case 'unitmgr':
                        this.router.navigate(['/unitmanager']);
                        break;
                    case 'driver':
                        this.router.navigate(['/driver']);
                        break;
                    case 'foodparkmgr':
                        this.router.navigate(['/foodparkmanager']);
                        break;
                    case 'hubmgr':
                        this.router.navigate(['/hubmanager']);
                        break;
                }
            }
        });
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
    }
}
