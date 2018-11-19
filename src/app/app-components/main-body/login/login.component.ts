import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../../app-services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    isLoading = false;
    private authStatusSubscription: Subscription;

    @Output() showAdminLoginPage = new EventEmitter();

    constructor(private formBuilder: FormBuilder,
                public authService: AuthService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    get f() {
        return this.loginForm.controls;
    }

    onLoginClick() {
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    }

    ngOnDestroy() {
        this.authStatusSubscription.unsubscribe();
    }
}
