import {Component, OnInit} from '@angular/core';
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
    templateUrl: './reporting.component.html',

})
export class ReportingComponent implements OnInit {
    lat: number;
    lng: number;
    latitude: number;
    longitude: number;
    currentYear;
    lastMonth;
    zoom = 3;
    markers: Marker[] = [];
    icon;
    mainHub: MainhubModel[];
    regionalHubs: RegionalHubModel[];
    pods: PodModel[];
    monthMap = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    };
    private mainhubsSubscription: Subscription;
    masterLoadCount: number;
    loadCount = 0;

    constructor(private dataService: DataService,
                private regionalHubService: RegionalhubsService,
                private mainhubService: MainhubService,
                private reportService: ReportingService,
                private router: Router) {
    }

    ngOnInit() {
        if (this.dataService.stringComparator(localStorage.getItem('userrole'), 'hubmgr')) {
            this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id')).subscribe((response) => {
                this.mainHub = response;
            });
        } else if (this.dataService.stringComparator(localStorage.getItem('userrole'), 'admin')) {
            this.mainhubService.getMainhubs();
            this.mainhubsSubscription = this.mainhubService.getMainhubsUpdateListener()
                .subscribe((res: MainhubModel[]) => {
                    this.mainHub = res;
                });
        }
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.reportService.getReportsOfLoggedInUser(response[0]['id']).subscribe(report => {
                    this.masterLoadCount = report['master_loads'];
                    this.regionalHubs = report['regionalhubs'];
                    const obj = {
                        latitude: parseFloat(report['mainhub'][0]['latitude']),
                        longitude: parseFloat(report['mainhub'][0]['longitude']),
                        label: report['mainhub'][0]['name'],
                        icon: '../../../../../assets/images/warehouse.svg'
                    };
                    this.markers.push(obj);
                    this.loadCount = 0;
                    report['regionalhubs'].forEach(hub => {
                        this.loadCount = hub['load_count'];
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
        this.lastMonth = this.monthMap[new Date().getMonth() === 0 ? 11 : new Date().getMonth()];
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
        const button = document.getElementById('year');
        button.innerText = this.currentYear;
    }

    onMonthSelected() {
        const button = document.getElementById('month');
        button.innerText = this.lastMonth;
    }

    onMainHubSelected() {
        const button = document.getElementById('mainhub');
        button.innerText = this.lastMonth;
    }

}

