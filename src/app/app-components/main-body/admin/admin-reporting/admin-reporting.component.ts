import {Component, OnInit} from '@angular/core';
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
export class AdminReportingComponent implements OnInit {

    // lat: number;
    // lng: number;
    // latitude: number;
    // longitude: number;
    // currentYear;
    // zoom = 1;
    // markers: Marker[] = [];
    // icon;
    // mainHub: MainhubModel[];
    // regionalHubs: RegionalHubModel[];
    // pods: PodModel[];
    // masterLoadCount: number;
    // loadCount = 0;
    // countries = [];
    // territories: TerritoryModel[] = [];
    // mainHubName: string;
    // private countriesSubscription: Subscription;
    // private territoriesSubscription: Subscription;
    // private mainhubsSubscription: Subscription;
    // private territorySelected: number;

    // constructor(private regionalHubService: RegionalhubsService,
    //             private mainhubService: MainhubService,
    //             private reportService: ReportingService,
    //             private router: Router,
    //             private countryService: CountryService,
    //             private territoryService: TerritoryService,
    //             private dialog: MatDialog,
    //             private dataService: DataService) {
    // }

    ngOnInit() {
    //     this.countryService.getCountries();
    //     this.countriesSubscription = this.countryService.getCountriesUpdateListener()
    //         .subscribe((countries: CountryModel[]) => {
    //             if (countries.length > 0) {
    //                 const countryName = countries[0]['name'];
    //                 const button = document.getElementById('country_button');
    //                 button.innerText = countryName;
    //                 this.countries = countries;
    //                 this.territoryService.getTerritoriesInCountry(countries[0]['id']);
    //             } else {
    //                 this.dialog.open(ErrorComponent, {data: {message: 'No Countries found!!'}});
    //             }
    //         });

    //     this.territoriesSubscription = this.territoryService.getTerritoriesUpdateListener()
    //         .subscribe((territories: TerritoryModel[]) => {
    //             if (territories.length > 0) {
    //                 this.territorySelected = 0;
    //                 const territoryName = territories[0]['territory'];
    //                 const territoryButton = document.getElementById('territory_button');
    //                 territoryButton.innerText = territoryName;
    //                 this.territories = territories;
    //                 this.mainhubService.getMainHubsInTerritory(this.territories[0]['country'], this.territories[0]['id']);
    //             } else {
    //                 this.dialog.open(ErrorComponent, {data: {message: 'No Territories found for the selected country'}});
    //             }
    //         });

    //     this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
    //         .subscribe((response: MainhubModel[]) => {
    //             this.mainHub = response;
    //             this.mainHubName = this.mainHub[0]['name'];
    //             const mainHubButton = document.getElementById('mainhub');
    //             mainHubButton.innerText = this.mainHubName;
    //             this.reportService.getReportsOfLoggedInUser(this.mainHub[0]['id']).subscribe(report => {
    //                 this.masterLoadCount = report['master_loads'];
    //                 this.regionalHubs = report['regionalhubs'];
    //                 const obj = {
    //                     latitude: parseFloat(report['mainhub'][0]['latitude']),
    //                     longitude: parseFloat(report['mainhub'][0]['longitude']),
    //                     label: report['mainhub'][0]['name'],
    //                     icon: '../../../../../assets/images/warehouse.png'
    //                 };
    //                 this.markers.push(obj);
    //                 this.loadCount = 0;
    //                 report['regionalhubs'].forEach(hub => {
    //                     this.loadCount = hub['load_count'];
    //                     hub['pods'].forEach(pod => {
    //                         const podMarker = {
    //                                 latitude: parseFloat(pod['latitude']),
    //                                 longitude: parseFloat(pod['longitude']),
    //                                 label: pod['name'],
    //                                 icon: '../../../../../assets/images/church.png'
    //                             }
    //                         ;
    //                         this.markers.push(podMarker);
    //                     });

    //                 });
    //             });
    //         });

    //     this.currentYear = new Date().getFullYear();
    }


    // clickedMarker(label: string, index: number) {
    //     console.log(`clicked the marker: ${label || index}`);
    // }

    // mapClicked($event: MouseEvent) {
    //     this.markers.push({
    //         latitude: $event['coords']['lat'],
    //         longitude: $event['coords']['lng'],
    //         draggable: true
    //     });
    // }

    // markerDragEnd(m: Marker, $event: MouseEvent) {
    //     console.log('dragEnd', m, $event);
    // }

    // onYearSelected() {
    //     const button = document.getElementById('date');
    //     button.innerText = this.currentYear;
    // }

    // onMonthSelected() {
    //     const button = document.getElementById('date');
    //     button.innerText = 'Last Month';
    // }

    // onMainHubSelected(hub) {
    //     const button = document.getElementById('mainhub');
    //     button.innerText = hub['name'];
    // }

}
