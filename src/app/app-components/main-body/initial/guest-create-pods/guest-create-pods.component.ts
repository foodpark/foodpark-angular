import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainhubModel, TerritoryModel, CountryModel } from 'src/app/model';
import { Subscription } from 'rxjs';
import { PodsService } from 'src/app/app-services/pods.service';
import { FileUploadService } from 'src/app/app-services/fileupload.service';
import { CountryService } from 'src/app/app-services/country.service';
import { TerritoryService } from 'src/app/app-services/territory.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';
import { DataService } from 'src/app/app-services/data.service';

@Component({
    selector: 'app-guest-create-pods',
    templateUrl: './guest-create-pods.component.html'
})
export class GuestCreatePodsComponent implements OnInit, OnDestroy {
    registerpodform: FormGroup;
    countries: CountryModel[] = [];
    territories: TerritoryModel[] = [];
    mainhubs: MainhubModel[] = [];
    private countriesSubscription: Subscription;
    private territoriesSubscription: Subscription;
    private fileUploadSubscription: Subscription;
    private mainhubsSubscription: Subscription;
    private church_id: number;
    wordfileURL: string;
    wordFileToUpload: File;
    hideFileContainer = false;

    churchType = [
        'Church',
        'Non-Profit',
        'Non-Religious',
        'Non-Denominational',
        'Other'
    ];
    connectedWith = [
        'Personal Referral',
        'Google Search',
        'Social Media',
        'Other'
    ];

    constructor(
        private formBuilder: FormBuilder,
        private route: Router,
        private countryService: CountryService,
        private territoryService: TerritoryService,
        private mainhubService: MainhubService,
        private podService: PodsService,
        private dataService: DataService,
        private fileUploadService: FileUploadService
    ) {
        this.countryService.getCountries();
        this.fileUploadSubscription = this.fileUploadService
            .getFileUploadListener()
            .subscribe(fileURL => {
                console.log('File Uploaded: ' + fileURL);
                this.wordfileURL = fileURL;
                this.createPodManager();
            });

        this.countriesSubscription = this.countryService
            .getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                this.countries = countries;
            });
        this.territoriesSubscription = this.territoryService
            .getTerritoriesUpdateListener()
            .subscribe((territories: TerritoryModel[]) => {
                this.territories = territories;
            });

        this.mainhubsSubscription = this.mainhubService
            .getMainhubsUpdateListener()
            .subscribe((res: MainhubModel[]) => {
                this.mainhubs = res;
            });
    }

    ngOnInit() {
        this.registerpodform = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required],
            church_name: ['', Validators.required],
            country_id: ['', Validators.required],
            territory_id: ['', Validators.required],
            main_hub_id: ['', Validators.required],
            country: ['', Validators.required],
            sponsor: ['', Validators.required],
            title: ['', Validators.required],
            type: ['', Validators.required],
            connected_with: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            wordFile: [null, Validators.required]
        });
    }

    onCountryClick(index: number, id: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.registerpodform
            .get('country')
            .setValue(this.countries[index]['name']);
        this.registerpodform
            .get('country_id')
            .setValue(this.countries[index]['id']);
        this.getTerritory(id);
    }

    getTerritory(id: number) {
        this.territoryService.getTerritoriesInCountry(id);
    }

    onTerritoryClick(index: number, item) {
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['territory'];
        this.registerpodform.get('territory_id').setValue(this.territories[index]['id']);
        this.getMainhubs(item.id, item.country);
    }

    getMainhubs(id: number, country: string) {
        this.mainhubService.getMainHubsInTerritory(country, id);
    }

    onMainHubClick(index: number, item) {
        const button = document.getElementById('mainhub_button');
        button.innerText = this.mainhubs[index]['name'];
        this.registerpodform
            .get('main_hub_id')
            .setValue(this.mainhubs[index]['id']);
    }

    onChurchTypeClick(type: string) {
        const button = document.getElementById('church_type');
        button.innerText = type;
        this.registerpodform.get('type').setValue(type);
    }

    onConnectedByClick(type: string) {
        const button = document.getElementById('connected_with');
        button.innerText = type;
        this.registerpodform.get('connected_with').setValue(type);
    }

    onFilePicked(files: FileList) {
        this.wordFileToUpload = files.item(0);
        this.hideFileContainer = this.dataService.nullCheck(
            this.wordFileToUpload
        );
        this.registerpodform.get('wordFile').setValue(this.wordFileToUpload);
        document.getElementById(
            'wordfile_name'
        ).innerText = this.wordFileToUpload.name;
    }

    createPod() {
        this.fileUploadService.uploadFile(this.wordFileToUpload);
    }

    private createPodManager() {
        const obj = {
            role: 'PODMGR',
            email: this.registerpodform.get('email').value,
            first_name: this.registerpodform.get('firstname').value,
            last_name: this.registerpodform.get('lastname').value,
            password: this.registerpodform.get('password').value,
            country_id: this.registerpodform.get('country_id').value,
            territory_id: this.registerpodform.get('territory_id').value,
            church_name: this.registerpodform.get('church_name').value,
            connected_with: this.registerpodform.get('connected_with').value
        };

        this.podService.registerPodManager(obj).subscribe(response => {
            console.log('Created pod manager');
            this.church_id = response['user']['church_id'];
            this.sendPodData();
        });
    }

    private sendPodData() {
        const title = this.registerpodform.get('title').value;
        const updatePodData = {
            name: this.registerpodform.value.church_name,
            title: title,
            main_hub_id: this.registerpodform.get('main_hub_id').value,
            connected_with: this.registerpodform.value.connected_with,
            sponsor: this.registerpodform.value.sponsor,
            latitude: this.registerpodform.value.latitude,
            longitude: this.registerpodform.value.longitude,
            type: this.registerpodform.value.type,
            approved: 'false',
            wordfile: this.wordfileURL
        };

        this.podService
            .updatePod(this.church_id, updatePodData)
            .subscribe(() => {
                this.route.navigate(['/hubmanager/podapplications']);
            });
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
        this.fileUploadSubscription.unsubscribe();
        this.territoriesSubscription.unsubscribe();
        this.mainhubsSubscription.unsubscribe();
    }
}
