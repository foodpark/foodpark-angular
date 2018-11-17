import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {CountryService} from '../../../app-services/country.service';
import {TerritoryService} from '../../../app-services/territory.service';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html'
})

export class DropdownComponent implements OnInit {
    dropdownData;
    @Input() dropdownName: string;
    @Output() selectedOption = new EventEmitter();

    constructor(private countryService: CountryService, private territoryService: TerritoryService) {
    }

    ngOnInit() {

    }

    getTerritory(id: number) {
        this.territoryService.getTerritoriesInCountry(id).subscribe(res => {
            Object.values(res).forEach(item => {
                this.dropdownData.push({'name': item['territory'], 'id': item['id']});
            });
        });
    }

    onListItemClick(index: number) {
        const button = document.getElementById('button' + this.dropdownName);
        button.innerText = this.dropdownData[index]['name'] || this.dropdownData[index]['territory'];
        if (this.dropdownName.toLowerCase() === 'territory') {
            this.selectedOption.emit(this.dropdownData[index]['id']);
        } else {
            const obj = {};
            obj[this.dropdownName] = this.dropdownData[index]['name'];
            this.getTerritory(this.dropdownData[index]['id']);
            this.selectedOption.emit(obj);
        }
    }
}




