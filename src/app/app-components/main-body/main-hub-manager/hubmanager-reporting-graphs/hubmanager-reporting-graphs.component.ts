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
    barChartData;
    dataColumns = [1, 1];
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
        this.mainhubsSubscription = this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.parseData();
            });
        this.currentYear = new Date().getFullYear();
    }

    parseData() {

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
