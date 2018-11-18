import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../../app-services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;

    @Output() showAdminLoginPage = new EventEmitter();

    constructor(private formBuilder: FormBuilder,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onLoginClick() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
        }
    }
}
