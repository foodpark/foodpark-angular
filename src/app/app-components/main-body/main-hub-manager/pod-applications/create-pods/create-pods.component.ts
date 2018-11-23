import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../../../../app-services/country.service';
import {TerritoryService} from '../../../../../app-services/territory.service';
import {Subscription} from 'rxjs';
import {CountryModel, TerritoryModel} from '../../../../../model';
import {DataService} from '../../../../../app-services/data.service';

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
    private messages: any;
    private companydetails: any;
    private vendorCreationResponse: any;

    constructor(private route: Router,
                private fb: FormBuilder,
                private countryService: CountryService,
                private territoryService: TerritoryService,
                private dataService: DataService) {
        this.countryService = countryService;
        this.messages = {};
        this.messages.validationmessage = '';
        this.companydetails = {};
        this.vendorCreationResponse = {};
    }

    formErrors = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        retypepassword: '',
        companyname: '',
        country_id: '',
        country: '',
        territory_id: '',
        mainhubId: '',
        regionalhubId: ''
    };

    validationMessages = {
        'firstname': {
            'required': 'Kindly enter valid first name',
            'pattern': 'Enter a valid first name'
        },
        'lastname': {
            'required': 'Kindly enter valid last name',
            'pattern': 'Enter a valid last name'
        },
        'email': {
            'required': 'Kindly enter valid email',
            'pattern': 'Enter a valid email id'
        },
        'password': {
            'required': 'Kindly enter valid password',
            'pattern': 'Enter a valid password'
        },
        'retypepassword': {
            'required': 'Kindly enter valid retype password',
            'pattern': 'Enter a valid password'
        },
        'companyname': {
            'required': 'Kindly enter valid vendor name',
            'pattern': 'Enter a valid vendor name'
        },
        'country': {
            'required': 'Kindly select the country'
        },
        'country_id': {
            'required': 'Kindly select the country'
        },
        'territory_id': {
            'required': 'Kindly select the territory'
        },
        'mainhubId': {
            'required': 'Kindly select the main hub'
        },
        'regionalhubId': {
            'required': 'Kindly select the regional hub'
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

    initForm() {
        this.register_company = this.fb.group({
            firstname: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
            lastname: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
            retypepassword: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
            companyname: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]{0,48})')]],
            country_id: ['', Validators.required],
            country: ['', Validators.required],
            territory_id: ['', Validators.required],
            mainhubId: ['', Validators.required],
            regionalhubId: ['', Validators.required],
            sponser: [''],
            title: [''],
            type: [''],
            connectedBy: [''],
            uploadAttachments: [''],
            tags: [''],
            description: [''],
            weekelySchedule: [''],
            typicalHours: [''],
            fborweb: [''],
            address: [''],
            phoneNumber: [''],
            latitude: [''],
            longitude: ['']
        });
        this.register_company.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.register_company) {
            return;
        }
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

    onValueSubmit(data?: any) {
        if (!this.register_company) {
            return;
        }
        const form = this.register_company;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && !control.valid) {
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

    getReginolHubs(id: number) {
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
        this.register_company.get('regionalhubId').setValue(this.reginaolHubs[index]['id']);
    }

    getMainhub(id: number) {
        this.territoryService.getMainHubInTerritory(id).subscribe(res => {
            this.mainHubs = [];
            Object.values(res).forEach(item => {
                this.mainHubs.push({'name': item['name'], 'id': item['id']});
            });
        });
    }

    onChurchTypeClick(type: string) {
        const button = document.getElementById('church_type');
        button.innerText = type;
        this.register_company.get('type').setValue(type);
    }

    onClickWeeklySchedule(id: string) {
        this.register_company.get('weekelySchedule').setValue(id);
    }

    createcompany() {
        console.log('form is working');
        console.log(this.register_company);
        this.onValueSubmit();
        this.messages.validationmessage = '';
        if (this.register_company.valid) {
            if (this.dataService.stringComparator(this.register_company.value.password, this.register_company.value.retypepassword)) {
                let reqObject = {
                    'company_name': this.register_company.value.companyname,
                    'country': this.register_company.value.country,
                    'country_id': this.register_company.value.country_id,
                    'email': this.register_company.value.email,
                    'first_name': this.register_company.value.firstname,
                    'last_name': this.register_company.value.lastname,
                    'password': this.register_company.value.password,
                    'role': 'owner',
                    'regional_hub_id': this.register_company.value.regionalhubId
                };

                this.territoryService.Apicreatepods(reqObject).subscribe(res => {
                    console.log(res);
                    this.vendorCreationResponse = res;
                    this.companydetails = {};
                    let id = (this.vendorCreationResponse && this.vendorCreationResponse.user) ? this.vendorCreationResponse.user.id : '';
                    this.territoryService.getCompanydetails(id).subscribe(response => {
                        console.log(response);
                        this.companydetails = response && response[0] ? response[0] : {};
                        if (this.companydetails.id) {
                            this.companydetails.sponsor = this.register_company.value.sponser;
                            this.companydetails.title = this.register_company.value.title;
                            this.companydetails.connected_by = this.register_company.value.connectedBy;
                            this.companydetails.type = this.register_company.value.type;
                            this.companydetails.tags = this.register_company.value.tags;
                            this.companydetails.description = this.register_company.value.description;
                            this.companydetails.schedule = this.register_company.value.weekelySchedule;
                            this.companydetails.hours = this.register_company.value.typicalHours;
                            this.companydetails.facebook = this.register_company.value.fborweb;
                            this.companydetails.business_address = this.register_company.value.address;
                            this.companydetails.phone = this.register_company.value.phoneNumber;
                            this.companydetails.photo = this.register_company.value.uploadAttachments;
                            this.companydetails.latitude = this.register_company.value.latitude;
                            this.companydetails.longitude = this.register_company.value.longitude;
                            console.log('Updating Company details');
                            console.log(this.companydetails);
                            this.territoryService.updateCompanydetails(this.companydetails).subscribe(apires => {
                                console.log(apires);
                                alert('Company/Vendor created successfully');
                                this.companydetails = {};
                                this.ngOnInit();
                            });
                        } else {
                            console.log('error occured');
                        }
                    });

                });
            } else {
                console.log('passwords are not matching');
                this.messages.validationmessage = 'Password and retype password are not matching';
            }

        }
    }

}
