import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';
import { AuthService } from 'src/app/app-services/auth.service';

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
                public authService: AuthService) {
    }

    formErrors = {
        'username': '',
        'password': ''
    };
    // Form Error Object
    validationMessages = {
        'username': {
            'required': 'username  required',
            'pattern': 'Enter a valid username'
        },
        'password': {
            'required': 'Password required',
            'minlength': 'Enter valid password'
        }
    };

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

        this.loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.loginForm) {
            return;
        }
        const form = this.loginForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }

        }

    }

    get f() {
        return this.loginForm.controls;
    }

    onLoginClick() {
        if (!this.loginForm.valid) {
            console.log('Form Is not Valid-------->');
            if (!this.loginForm) {
                return;
            }
            const form = this.loginForm;
            for (const field in this.formErrors) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }

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
