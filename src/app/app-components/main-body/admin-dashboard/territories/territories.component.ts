import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
    selector: 'app-territories',
    templateUrl: './territories.component.html',
    styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {
    gridMetadata;
    territories = [];
    country = [];

    constructor(private http: HttpClient, private router: Router) {
        this.http.get('https://api.instamarkt.co/api/v1/rel/territories').subscribe(res => {
            Object.values(res).forEach(item => {
                this.territories.push(item['territory']);
                this.country.push(item['country']);
            });
            this.gridMetadata = res;
        });
    }

    ngOnInit() {
    }

    onEditClick() {
        this.router.navigate(['/add_edit_territories']);
    }

    onDeleteClick() {
    }

}
