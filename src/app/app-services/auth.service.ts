import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private timerReference;
    isTimeout: boolean;

    constructor() {
    }

    loginTimeout() {
        this.isTimeout = true;
    }

    initiateLoginTimer() {
        this.timerReference = setTimeout(() => {
            this.loginTimeout();
        }, 600000);
    }
}
