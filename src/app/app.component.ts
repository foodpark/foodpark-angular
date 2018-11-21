import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {DataService} from './app-services/data.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(private dataService: DataService, private router: Router) {
    }

    ngOnInit() {
        // this.router.navigate(['']);
        const app: AppComponent = this;
        // String.prototype.toLocaleString = function () {
        //     return (app.dataService.localeStringsMap || {})[this] || this;
        // };
        if (environment.production) {
            // write logic for production env
        } else {
        }
    }


}
