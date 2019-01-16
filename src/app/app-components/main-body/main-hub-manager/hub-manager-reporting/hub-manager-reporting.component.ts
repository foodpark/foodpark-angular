import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {Router} from '@angular/router';
import {ReportingService} from '../../../../app-services/reporting.service';
import {MainhubModel, ReportingModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {TreeModel} from 'ng2-tree';

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
    latitude: number;
    longitude: number;
    currentYear;
    zoom = 3;
    markers: Marker[] = [];
    mainHub: MainhubModel;
    report: ReportingModel;
    tree: TreeModel;
    private mainhubsSubscription: Subscription;
    private reportsSubscription: Subscription;


    constructor(private mainhubService: MainhubService,
                private reportService: ReportingService,
                private router: Router) {
    }

    ngOnInit() {
        this.mainhubsSubscription = this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.reportsSubscription = this.reportService.getReportsOfLoggedInUser(response[0]['id']).subscribe(reportModel => {
                    this.report = reportModel;
                    this.parseData();
                });
            });
        this.currentYear = new Date().getFullYear();
    }

    parseData() {
        const obj = {
            latitude: this.report.mainhub.latitude,
            longitude: this.report.mainhub.longitude,
            label: this.report.mainhub.name,
            icon: '../../../../../assets/images/warehouse.png'
        };
        this.markers.push(obj);

        const regionalTrees = [];
        if (this.report.regionalhubs.length > 0) {
            this.report.regionalhubs.forEach(hub => {
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
            'value': this.report.mainhub.name + '(' + this.report.master_loads + ')',
            'children': regionalTrees
        };
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
        const startTime = new Date(new Date().getFullYear(), 0, 1).getTime();
        this.reportService.getReportsFromTime(this.mainHub['id'], startTime).subscribe(reportModel => {
            this.report = reportModel;
            this.parseData();
        });
    }

    onMonthSelected() {
        const button = document.getElementById('date');
        button.innerText = 'Last Month';
        const date = new Date();
        const startTime = new Date().setDate(date.getDate() - 30);
        this.reportService.getReportsFromTime(this.mainHub['id'], startTime).subscribe(reportModel => {
            this.report = reportModel;
            this.parseData();
        });
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
