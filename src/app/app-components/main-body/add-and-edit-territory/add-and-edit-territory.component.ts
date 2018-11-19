import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CountryService} from '../../../app-services/country.service';
import {Router} from '@angular/router';
import {TerritoryService} from '../../../app-services/territory.service';

@Component({
    selector: 'app-edit-territory',
    templateUrl: './add-and-edit-territory.component.html',
})
export class AddAndEditTerritoryComponent implements OnInit {
    form: FormGroup;
    countries = [];

    constructor(private formBuilder: FormBuilder,
                private territoryService: TerritoryService,
                private countryService: CountryService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            territory: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            country: ['', Validators.required]
        });

        // this.countryService.getCountries().subscribe(
        //     res => {
        //         this.countries = [];
        //         Object.values(res).forEach(item => {
        //             this.countries.push({'name': item['name'], 'id': item['id']});
        //         });
        //     });
    }

    get f() {
        return this.form.controls;
    }

    onSaveClick() {
        this.territoryService.addTerritories(this.form.value);
        this.router.navigate(['/admin/territories']);
    }

    onCountryClick(index: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
    }
}
