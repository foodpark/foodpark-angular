import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryModel, MainhubModel, PodModel, RegionalHubModel, TerritoryModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {ReportingService} from '../../../../app-services/reporting.service';
import {Router} from '@angular/router';
import {CountryService} from '../../../../app-services/country.service';
import {TerritoryService} from '../../../../app-services/territory.service';
import {MatDialog} from '@angular/material';
import {ErrorComponent} from '../../../../error/error.component';

@Component({
    selector: 'app-admin-reporting-graphs',
    templateUrl: './admin-reporting-graphs.component.html',
})
export class AdminReportingGraphsComponent implements OnInit, OnDestroy {

    mainHub: MainhubModel[];
    regionalHubs: RegionalHubModel[];
    pods: PodModel[];
    countries = [];
    territories: TerritoryModel[] = [];
    mainHubName: string;
    reports;
    countryName: string;
    territoryName: string;
    barChartData;
    dataColumns = [1, 1];
    colors = ['red', 'green', 'blue'];
    masterLoadCount: number;
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
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.barChartData = [{
            id: 0,
            label: 'Regional hub1',
            value1: 10,
            value2: 15,
        }, {
            id: 1,
            label: 'Regional hub2',
            value1: 20,
            value2: 5,
        }];
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
                    this.reportsSubscription = this.reportService.getReportsFromTerritoryIdInGraphs(territories[0]['id']).subscribe(report => {
                        this.masterLoadCount = report['master_loads'];
                        this.regionalHubs = report['regionalhubs'];
                        this.reports = report;
                        this.parseData(this.reports);
                    });
                } else {
                    this.dialog.open(ErrorComponent, {data: {message: 'No Territories found for the selected country'}});
                }
            });

        this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
            .subscribe((response: MainhubModel[]) => {
                this.mainHub = response;
                this.mainHubName = this.mainHub.length ? this.mainHub[0]['name'] : '';
            });
    }

    parseData(reports?) {
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

    ngOnDestroy() {
        this.mainhubsSubscription && this.mainhubsSubscription.unsubscribe();
        this.reportsSubscription && this.reportsSubscription.unsubscribe();
    }

}
