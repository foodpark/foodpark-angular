import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryModel, MainhubModel, PodModel, RegionalHubModel, TerritoryModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {DataService} from '../../../../app-services/data.service';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {ReportingService} from '../../../../app-services/reporting.service';
import {Router} from '@angular/router';
import {CountryService} from '../../../../app-services/country.service';
import {TerritoryService} from '../../../../app-services/territory.service';
import {MatDialog} from '@angular/material';
import {ErrorComponent} from '../../../../error/error.component';
import {TreeModel} from 'ng2-tree';

interface Marker {
    latitude: number;
    longitude: number;
    label?: string;
    draggable?: boolean;
    icon?: string;
}

@Component({
    selector: 'app-admin-reporting',
    templateUrl: './admin-reporting.component.html'
})
export class AdminReportingComponent implements OnInit, OnDestroy {
    latitude: number;
    longitude: number;
    currentYear;
    markers: Marker[] = [];
    icon;
    mainHub: MainhubModel[];
    regionalHubs: RegionalHubModel[];
    pods: PodModel[];
    masterLoadCount: number;
    countries = [];
    territories: TerritoryModel[] = [];
    mainHubName: string;
    reports;
    tree: TreeModel;
    countryName: string;
    territoryName: string;
    private countriesSubscription: Subscription;
    private territoriesSubscription: Subscription;
    private mainhubsSubscription: Subscription;
    private reportsSubscription: Subscription;

    constructor(private regionalHubService: RegionalhubsService,
                private mainhubService: MainhubService,
                private reportService: ReportingService,
                private router: Router,
                private countryService: CountryService,
                private territoryService: TerritoryService,
                private dialog: MatDialog,
                private dataService: DataService) {
    }

    ngOnInit() {
        this.countryService.getCountries();
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                if (countries.length > 0) {
                    this.countryName = countries[0]['name'];
                    const button = document.getElementById('country_button');
                    button.innerText = this.countryName;
                    this.countries = countries;
                    this.territoryService.getTerritoriesInCountry(countries[0]['id']);
                } else {
                    this.dialog.open(ErrorComponent, {data: {message: 'No Countries found!!'}});
                }
            });

        this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
            .subscribe((territories: TerritoryModel[]) => {
                if (territories.length > 0) {
                    this.territoryName = territories[0]['territory'];
                    const territoryButton = document.getElementById('territory_button');
                    territoryButton.innerText = this.territoryName;
                    this.territories = territories;
                    this.mainhubService.getMainHubsInTerritory(this.territories[0]['country'], this.territories[0]['id']);
                } else {
                    this.dialog.open(ErrorComponent, {data: {message: 'No Territories found for the selected country'}});
                }
            });

        this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
            .subscribe((response: MainhubModel[]) => {
                this.mainHub = response;
                this.mainHubName = this.mainHub.length ? this.mainHub[0]['name'] : '';
                const mainHubButton = document.getElementById('mainhub');
                mainHubButton.innerText = this.mainHubName;
                this.reportsSubscription = this.reportService.getReportsFromTime(this.mainHub[0]['id'], new Date(new Date().getFullYear(), 0, 1).getTime()).subscribe(report => {
                    this.masterLoadCount = report['master_loads'];
                    this.regionalHubs = report['regionalhubs'];
                    this.reports = report;
                    this.parseData(this.reports);
                });
            });

        this.currentYear = new Date().getFullYear();
    }

    parseData(reports?) {
        this.latitude = this.reports.mainhub.latitude;
        this.longitude = this.reports.mainhub.longitude;
        const obj = {
            latitude: parseFloat(reports['mainhub'] ? reports['mainhub']['latitude'] : this.mainHub[0]['latitude']),
            longitude: parseFloat(reports['mainhub'] ? reports['mainhub']['longitude'] : this.mainHub[0]['longitude']),
            label: reports['mainhub']['name'] || this.mainHub[0]['name'],
            icon: '../../../../../assets/images/warehouse.png'
        };
        this.markers.push(obj);
        const regionalTrees = [];
        if (reports.regionalhubs.length > 0) {
            reports.regionalhubs.forEach(hub => {
                const children = [];
                hub.pods.forEach(pod => {
                    children.push({'value': pod.name + '(' + pod.load_count + ')'});
                    const podMarker = {
                        latitude: pod.latitude,
                        longitude: pod.longitude,
                        label: pod.name,
                        icon: '../../../../../assets/images/church.png'
                    };
                    this.markers.push(podMarker);
                });

                regionalTrees.push({
                    'value': hub.name + ' (' + hub.load_count + ')',
                    'children': children
                });
            });
        }

        this.tree = {
            'value': reports.mainhub.name + '(' + reports.master_loads + ')',
            'children': regionalTrees
        };
    }

    onCountryClick(index: number) {
        const button = document.getElementById('country_button');
        button.innerText = this.countries[index]['name'];
        this.countryName = this.countries[index]['name'];
        this.territoryService.getTerritoriesInCountry(this.countries[index]['id']);
    }

    onTerritoryClick(index: number) {
        const button = document.getElementById('territory_button');
        button.innerText = this.territories[index]['name'] || this.territories[index]['territory'];
        this.mainhubService.getMainHubsInTerritory(this.countryName, this.territories[index]['id']);
    }

    onMainHubSelected(hub) {
        const button = document.getElementById('mainhub');
        button.innerText = hub['name'];
        this.mainHub = hub;
    }

    onYearSelected() {
        const button = document.getElementById('date');
        button.innerText = this.currentYear;
        const startTime = new Date(new Date().getFullYear(), 0, 1).getTime();
        this.reportService.getReportsFromTime(this.mainHub[0]['id'], startTime).subscribe(reportModel => {
            this.reports = reportModel;
            this.parseData(this.reports);
        });
    }

    onMonthSelected() {
        const button = document.getElementById('date');
        button.innerText = 'Last Month';
        const date = new Date();
        const startTime = new Date().setDate(date.getDate() - 30);
        this.reportService.getReportsFromTime(this.mainHub[0]['id'], startTime).subscribe(reportModel => {
            this.reports = reportModel;
            this.parseData(this.reports);
        });
    }

    ngOnDestroy() {
        this.mainhubsSubscription && this.mainhubsSubscription.unsubscribe();
        this.reportsSubscription && this.reportsSubscription.unsubscribe();
    }
}
