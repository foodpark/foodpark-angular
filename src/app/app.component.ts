import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {DataService} from './app-services/data.service';
import { AuthService } from './app-services/auth.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, Event as NavigationEvent } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loading:any;
    constructor(private dataService: DataService, private authService: AuthService, private router: Router) {
      this.loading = true;

    }


    ngOnInit() {
        this.authService.autoAuthUser();
        this.router.events
            .subscribe((event) => {
                if(event instanceof NavigationStart) {
                  document.getElementById('loader').classList.remove('hide1');
                }
                else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                    ) {
                    document.getElementById('loader').classList.add('hide1');
                }
            });
    }
}
