import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;


    @Output() showAdminLoginPage = new EventEmitter();

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private router: Router) {
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
            this.http.post('https://api.instamarkt.co/auth/login', this.loginForm.value).subscribe((res) => {
                if (res['user']['role'].toLowerCase() === 'admin') {
                    this.router.navigate(['/adminlogin']);
                    this.showAdminLoginPage.emit(res);
                }
            });
        } else {
            return;
        }
    }

}
