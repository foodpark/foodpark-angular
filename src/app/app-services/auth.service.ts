import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {environment} from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthData} from '../model';


@Injectable({providedIn: 'root'})
export class AuthService {
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();

    private token: string = null;
    private userRole: string;
    private userName: string;
    private timerReference;
    isTimeout: boolean;
    id: string;


    constructor(private http: HttpClient, private router: Router) {}

    loginTimeout() {
        this.isTimeout = true;
    }

    initiateLoginTimer() {
        this.timerReference = setTimeout(() => {
            this.loginTimeout();
        }, 600000);
    }

    getToken() {
        if (this.token === null) {
            return '';
        }

        return this.token;
    }

    getUserRole() {
        return this.userRole;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getUserName() {
        return this.userName;
    }

    routeAppropriately() {
        switch (this.userRole) {
            case 'admin':
                this.router.navigate(['/admin']);
                break;
            case 'hubmgr':
                this.router.navigate(['/hubmanager']);
                break;
        }
    }

    login(usrname: string, pwd: string) {
        const authData: AuthData = {username: usrname, password: pwd};
        this.http.post<{ token: string }>(environment.apiUrl + '/auth/login', authData)
            .subscribe(
                response => {
                    const token = response.token;
                    this.token = token;

                    if (token) {
                        this.isAuthenticated = true;
                        this.authStatusListener.next(true);
                        this.userRole = response['user']['role'].toLowerCase();
                        this.userName = response['user']['username'];
                        this.id = response['user']['id'];
                        this.saveAuthData(token, this.userRole, this.userName, this.id);
                        this.routeAppropriately();
                    }
                },
                error => {
                    this.authStatusListener.next(false);
                }
            );
    }

    autoAuthUser() {
        const authIfnormation = this.getAuthData();
        if (!authIfnormation) {
            return;
        }

        this.token = authIfnormation.token;
        this.userRole = authIfnormation.userrole;
        this.userName = authIfnormation.username;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.routeAppropriately();
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        this.router.navigate(['/dashboard']);
    }

    private saveAuthData(token: string, userrole: string, username: string, id: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('userrole', userrole);
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('userrole');
        localStorage.removeItem('username');
    }

    getAuthData() {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userrole');
        const name = localStorage.getItem('username');
        const id = localStorage.getItem('id');
        if (!token || !role || !name) {
            return;
        }

        return {
            token: token,
            username: name,
            userrole: role,
            id: id
        };
    }

    apiGetMainHUbDetails(parms) {
        return this.http.get(environment.apiUrl + '/api/v1/rel/food_parks' + parms).map((response) => {
            return response;
        });
    }

    apiCreaateRegionHub(reqobj) {
        return this.http.post(environment.apiUrl + '/api/v1/rel/regionalhubs', reqobj).map((response) => {
            return response;
        });
    }
}
