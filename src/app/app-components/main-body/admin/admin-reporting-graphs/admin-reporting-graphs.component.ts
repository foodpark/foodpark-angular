import {Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import {CountryModel, MainhubModel, PodModel, TerritoryModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {ReportingService} from '../../../../app-services/reporting.service';
import {CountryService} from '../../../../app-services/country.service';
import {TerritoryService} from '../../../../app-services/territory.service';

@Component({
    selector: 'app-admin-reporting-graphs',
    templateUrl: './admin-reporting-graphs.component.html',
})
export class AdminReportingGraphsComponent implements OnInit, OnDestroy, AfterViewInit {
    title: string[] = [];
    type = 'ColumnChart';
    data = [];
    columnNames = ['Entity', 'Loads'];
    myRoles = [
        {role: 'style', type: 'string', index: 2},
        {role: 'annotation', type: 'string', index: 3}
    ];
    width;
    height = 400;
    options = {
        legend: {position: 'none'}
    };


    mainHub: MainhubModel[];
    pods: PodModel[];
    countries = [];
    territories: TerritoryModel[] = [];
    mainHubName: string;
    reports;
    countryName: string;
    territoryName: string;

    private countriesSubscription: Subscription;
    private territoriesSubscription: Subscription;
    private mainhubsSubscription: Subscription;

    constructor(private mainhubService: MainhubService,
                private reportService: ReportingService,
                private countryService: CountryService,
                private territoryService: TerritoryService) {
    }

    ngOnInit() {
        this.countriesSubscription = this.countryService.getCountriesUpdateListener()
            .subscribe((countries: CountryModel[]) => {
                if (countries.length > 0) {
                    this.countryName = countries[0]['name'];
                    const button = document.getElementById('country_button');
                    button.innerText = this.countryName;
                    this.countries = countries;
                    this.territoryService.getTerritoriesInCountry(countries[0]['id']);
                } else {
                    // this.dialog.open(ErrorComponent, {data: {message: 'No Countries found!!'}});
                    // show error
                }
            });

        this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
            .subscribe((territories: TerritoryModel[]) => {
                if (territories.length > 0) {
                    this.territoryName = territories[0]['territory'];
                    const territoryButton = document.getElementById('territory_button');
                    territoryButton.innerText = this.territoryName;
                    this.territories = territories;
                    this.fetchReportsData(territories[0]['id']);
                } else {
                    // this.dialog.open(ErrorComponent, {data: {message: 'No Territories found for the selected country'}});
                    // show error
                }
            });

        this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
            .subscribe((response: MainhubModel[]) => {
                this.mainHub = response;
                this.mainHubName = this.mainHub.length ? this.mainHub[0]['name'] : '';
            });

        this.countryService.getCountries();
    }

    ngAfterViewInit() {
        this.width = document.getElementById('graph_container').clientWidth;
    }

    fetchReportsData(territoryId: number) {
        this.reportService.getReportsFromTerritoryIdInGraphs(territoryId)
        .subscribe(report => {
            this.reports = report;
            this.parseData();
        });
    }

    parseData() {
        this.title = [];
        this.data = [];
        this.reports.forEach(report => {
            const graphData = [];
            this.title.push(report.mainhub.name);
            graphData.push(['Master Loads', report.master_loads, 'MediumSeaGreen', report.master_loads.toString(10)]);
            if (report.regionalhubs.length > 0) {
                report.regionalhubs.forEach(hub => {
                    graphData.push([hub.name, hub.load_count, 'gold', hub.load_count.toString(10)]);
                    hub.pods.forEach(pod => {
                        graphData.push([pod.name, pod.load_count, 'blue', pod.load_count.toString(10)]);
                    });
                });
            }
            this.data.push(graphData);
        });
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
        this.fetchReportsData(this.territories[index]['id']);
    }

    ngOnDestroy() {
        this.mainhubsSubscription.unsubscribe();
        this.countriesSubscription.unsubscribe();
        this.territoriesSubscription.unsubscribe();
    }

}
