import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-territories',
    templateUrl: './territories.component.html',
    styleUrls: ['./territories.component.scss']
})
export class TerritoriesComponent implements OnInit {

    constructor(private http: HttpClient) {
        this.http.get('https://api.instamarkt.co/api/v1/rel/territories').subscribe(res => {
            console.log(res);
        });
    }

    ngOnInit() {
    }


}
