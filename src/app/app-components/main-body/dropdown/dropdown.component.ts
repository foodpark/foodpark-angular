import {Component, Input, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() dropdownName: string;
    dropdownData;

    constructor(private http: HttpClient) {
        if (this.dropdownName.toLowerCase() === 'countries ') {
            this.http.get('https://api.instamarkt.co/api/v1/rel/countries').subscribe(res => {
                this.dropdownData = res;
            });
        } else if (this.dropdownName.toLowerCase() === 'territories ') {
            this.http.get('https://api.instamarkt.co/api/v1/rel/territories').subscribe(res => {
                this.dropdownData = res;
            });
        }

    }

    ngOnInit() {
    }


    onListItemClick(index: number) {
        const button = document.getElementById('button');
        button.innerText = this.dropdownData[index]['name'];
    }
}




