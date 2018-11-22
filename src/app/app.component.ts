import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {DataService} from './app-services/data.service';
import { AuthService } from './app-services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private dataService: DataService, private authService: AuthService) {}

    ngOnInit() {
        this.authService.autoAuthUser();
    }
}
