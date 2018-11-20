import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from './../../../../../app-services/country.service';
import {TerritoryService} from './../../../../../app-services/territory.service';
import { CountryModel } from 'src/app/app-modules/country.model';
import { TerritoryModel } from 'src/app/app-modules/territory.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'create-pods',
  templateUrl: './create-pods.component.html',

})
export class CreatePodsComponent implements OnInit {

  register_company: FormGroup;
  countries: CountryModel[] = [];
  territories: TerritoryModel[] = [];
  private countriesSubscription: Subscription;
  private territoriesSubscription: Subscription;
  mainHubs = [];
  reginaolHubs = [];

  constructor(private route : Router,
    		 private fb: FormBuilder,
    		 private countryService: CountryService,
    		 private territoryService: TerritoryService) {
  		this.countryService = countryService;
  }

  formErrors = {
    startcard : "",
    endcard:"",
    email:""
  };

  validationMessages = {
     'firstname' : {
       'required': 'Kindly enter valid first name',
       'pattern' : 'Enter a valid first name'
     },
     'lastname' : {
       'required': 'Kindly enter valid last name',
       'pattern' : 'Enter a valid last name'
     },
     "email" :{
        'required': 'Kindly enter valid email',
       'pattern' : 'Enter a valid email id'
     },
     "password" :{
        'required': 'Kindly enter valid password',
       'pattern' : 'Enter a valid password'
     },
     "retypepassword" :{
        'required': 'Kindly enter valid retype password',
       'pattern' : 'Enter a valid password'
     },
     "companyname" :{
        'required': 'Kindly enter valid vendor name',
       'pattern' : 'Enter a valid vendor name'
     }

  };

  ngOnInit() {
  	this.initForm();
  	this.countryService.getCountries();
    this.countriesSubscription = this.countryService.getCountriesUpdateListener()
    .subscribe((countries: CountryModel[]) => {
        this.countries = countries;
    });
    this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
    .subscribe((territories: TerritoryModel[]) => {
        this.territories = territories;
    });
  }

  initForm(){
     this.register_company = this.fb.group({
         firstname: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
         lastname: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
         email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
         password: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
         retypepassword: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
         companyname: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
         country_id: ['', Validators.required],
         country: ['', Validators.required],
         territory_id : ['', Validators.required],
         mainhubId: ['', Validators.required]
       });
      this.register_company.valueChanges
        .subscribe(data => this.onValueChanged(data));
          this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.register_company) { return; }
    const form = this.register_company;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onCountryClick(index: number, id: number) {
	    const button = document.getElementById('country_button');
	    button.innerText = this.countries[index]['name'];
	    this.getTerritory(id);
	    this.register_company.get('country').setValue(this.countries[index]['name']);
	    this.register_company.get('country_id').setValue(this.countries[index]['id']);
	}

	getTerritory(id: number) {
	    this.territoryService.getTerritoriesInCountry(id);
	}

  onTerritoryClick(index: number) {
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['territory'];
        this.register_company.get('territory_id').setValue(this.territories[index]['id']);
        this.getMainhub(this.territories[index]['id']);
    }

    onMainhubClick(index: number) {
        const button = document.getElementById('mainhub_button');
        button.innerText = this.mainHubs[index]['name'];
        this.register_company.get('mainhubId').setValue(this.mainHubs[index]['id']);
        console.log(this.register_company);
        this.getReginolHubs(this.mainHubs[index]['id']);
    }

    getReginolHubs(id:number){
    	this.territoryService.getRegionalHubInMainhib(id).subscribe(res => {
            this.reginaolHubs = [];
            console.log(res);
            Object.values(res).forEach(item => {
                this.reginaolHubs.push({'name': item['name'], 'id': item['id']});
            });
        });
    }

    onRegionhubClick(index: number) {
        const button = document.getElementById('region_button');
        button.innerText = this.reginaolHubs[index]['name'];
        // this.register_company.get('mainhubId').setValue(this.mainHubs[index]['id']);
        //console.log(this.register_company);
        //this.getReginolHubs(this.mainHubs[index]['id']);
    }

    getMainhub(id: number) {
        this.territoryService.getMainHubInTerritory(id, 'MAIN').subscribe(res => {
            this.mainHubs = [];
            Object.values(res).forEach(item => {
                this.mainHubs.push({'name': item['name'], 'id': item['id']});
            });
        });
    }

  createcompany(){
    this.territoryService.Apicreatepods(this.register_company).subscribe(res => {

      console.log("form is working");
    	console.log(this.register_company);
    })
    console.log("form is working");
    console.log(this.register_company);

  }

}
