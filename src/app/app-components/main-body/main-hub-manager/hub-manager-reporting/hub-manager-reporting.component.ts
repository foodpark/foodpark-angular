import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../../../app-services/data.service';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {Router} from '@angular/router';
import {ReportingService} from '../../../../app-services/reporting.service';
import {MainhubModel, PodModel, RegionalHubModel} from '../../../../model';
import {Subscription} from 'rxjs';

interface Marker {
    latitude: number;
    longitude: number;
    label?: string;
    draggable?: boolean;
    icon?: string;
}

@Component({
    selector: 'app-reporting',
    templateUrl: './hub-manager-reporting.component.html',

})
export class HubManagerReportingComponent implements OnInit, OnDestroy {
    lat: number;
    lng: number;
    latitude: number;
    longitude: number;
    currentYear;
    zoom = 3;
    markers: Marker[] = [];
    icon;
    mainHub: MainhubModel;
    regionalHubs: RegionalHubModel[];
    pods: PodModel[];
    private mainhubsSubscription: Subscription;
    private reportsSubscription: Subscription;
    masterLoadCount: number;
    loadCount = [];

    constructor(private dataService: DataService,
                private regionalHubService: RegionalhubsService,
                private mainhubService: MainhubService,
                private reportService: ReportingService,
                private router: Router) {
    }

    ngOnInit() {
        this.mainhubsSubscription = this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.reportsSubscription = this.reportService.getReportsOfLoggedInUser(response[0]['id']).subscribe(report => {
                    this.masterLoadCount = report['master_loads'];
                    this.regionalHubs = report['regionalhubs'];
                    const obj = {
                        latitude: parseFloat(report['mainhub'][0]['latitude']),
                        longitude: parseFloat(report['mainhub'][0]['longitude']),
                        label: report['mainhub'][0]['name'],
                        icon: '../../../../../assets/images/warehouse.svg'
                    };
                    this.markers.push(obj);
                    this.loadCount = [];
                    this.regionalHubs.forEach(hub => {
                        this.loadCount.push(hub['load_count']);
                        hub['pods'].forEach(pod => {
                            const podMarker = {
                                    latitude: parseFloat(pod['latitude']),
                                    longitude: parseFloat(pod['longitude']),
                                    label: pod['name'],
                                    icon: '../../../../../assets/images/Church.svg'
                                }
                            ;
                            this.markers.push(podMarker);
                        });

                    });
                });
            });
        this.currentYear = new Date().getFullYear();
    }


    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    mapClicked($event: MouseEvent) {
        this.markers.push({
            latitude: $event['coords']['lat'],
            longitude: $event['coords']['lng'],
            draggable: true
        });
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    onYearSelected() {
        const button = document.getElementById('date');
        button.innerText = this.currentYear;
    }

    onMonthSelected() {
        const button = document.getElementById('date');
        button.innerText = 'Last Month';
    }

    onMainHubSelected() {
        const button = document.getElementById('mainhub');
        button.innerText = this.mainHub['name'];
    }

    ngOnDestroy() {
        this.mainhubsSubscription && this.mainhubsSubscription.unsubscribe();
        this.reportsSubscription && this.reportsSubscription.unsubscribe();
    }
}

