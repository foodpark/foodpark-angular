import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {
    dropdownData;
    countryData;
    @Input() dropdownName: string;
    @Output() selectedOption = new EventEmitter();

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        if (this.dropdownName.toLowerCase() === 'country') {
            this.http.get(environment.apiUrl + '/api/v1/rel/countries').subscribe(res => {
                this.dropdownData = res;
            });
        } else if (this.dropdownName.toLowerCase() === 'territory') {
            this.http.get(environment.apiUrl + '/api/v1/rel/territories').subscribe(res => {
                this.dropdownData = res;
            });
        }
    }


    onListItemClick(index: number) {
        const button = document.getElementById('button' + this.dropdownName);
        button.innerText = this.dropdownData[index]['name'] || this.dropdownData[index]['territory'];
        if (this.dropdownName.toLowerCase() === 'territory') {
            this.selectedOption.emit(this.dropdownData[index]['id']);
        } else {
            const obj = {};
            obj[this.dropdownName] = this.dropdownData[index]['name'];
            this.selectedOption.emit(obj);
        }
    }
}




