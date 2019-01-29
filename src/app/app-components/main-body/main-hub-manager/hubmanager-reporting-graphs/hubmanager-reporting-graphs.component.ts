import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainhubModel, ReportingModel} from '../../../../model';
import {TreeModel} from 'ng2-tree';
import {Subscription} from 'rxjs';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {ReportingService} from '../../../../app-services/reporting.service';

@Component({
    selector: 'app-hubmanager-reporting-graphs',
    templateUrl: './hubmanager-reporting-graphs.component.html',
})
export class HubmanagerReportingGraphsComponent implements OnInit, OnDestroy {
    barChartData: any;
    dataColumns = [1];
    colors = ['red', 'green', 'blue'];
    currentYear;
    mainHub: MainhubModel;
    report: ReportingModel;
    tree: TreeModel;
    private mainhubsSubscription: Subscription;
    private reportsSubscription: Subscription;

    constructor(private mainhubService: MainhubService,
                private reportService: ReportingService) {
    }

    ngOnInit() {
        this.mainhubsSubscription = this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.reportsSubscription = this.reportService.getReportsFromTime(this.mainHub.id, new Date(new Date().getFullYear(), 0, 1).getTime()).subscribe(reportModel => {
                    this.report = reportModel;
                    this.parseData();
                });
            });
        this.currentYear = new Date().getFullYear();
    }

    parseData() {
        var count = 0;
        var graphData = new Array();
        if (this.report.regionalhubs.length > 0) {
            this.report.regionalhubs.forEach(hub => {
                graphData.push({
                    id: count,
                    label: hub.name,
                    value1: hub.load_count
                });
                count += 1;
                hub.pods.forEach(pod => {
                    graphData.push({
                        id: count,
                        label: pod.name,
                        value1: pod.load_count
                    });
                    count += 1;
                });
            });
        }

        this.barChartData = graphData;
        /*
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
        }, {
            id: 2,
            label: 'Regional hub3',
            value1: 20,
            value2: 5,
        }];
        */
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

    ngOnDestroy() {
        this.mainhubsSubscription && this.mainhubsSubscription.unsubscribe();
        this.reportsSubscription && this.reportsSubscription.unsubscribe();
    }
}
