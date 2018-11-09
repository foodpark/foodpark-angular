import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
                switch (res['user']['role'].toLowerCase()) {
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
            });
        } else {
            return;
        }
    }
}
