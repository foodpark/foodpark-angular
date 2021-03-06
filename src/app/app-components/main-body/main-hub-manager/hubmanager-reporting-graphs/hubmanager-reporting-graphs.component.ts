import {Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import {MainhubModel, ReportingModel} from '../../../../model';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {ReportingService} from '../../../../app-services/reporting.service';

@Component({
    selector: 'app-hubmanager-reporting-graphs',
    templateUrl: './hubmanager-reporting-graphs.component.html'
})
export class HubmanagerReportingGraphsComponent implements OnInit, OnDestroy, AfterViewInit {
    title: string;
    type = 'ColumnChart';
    data;
    columnNames = ['Entity', 'Loads'];
    myRoles = [
        {role: 'style', type: 'string', index: 2},
        {role: 'annotation', type: 'string', index: 3}
    ];
    width;
    height = 400;
    currentYear;
    mainHub: MainhubModel;
    report: ReportingModel;
    options = {
        legend: {position: 'none'}
    };

    constructor(
        private mainhubService: MainhubService,
        private reportService: ReportingService) {
    }

    ngOnInit() {
        this.width = document.getElementById('graph_container').clientWidth;
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe(response => {
                this.mainHub = response[0];
                this.reportService.getReportsFromTime(this.mainHub.id,
                    new Date(new Date().getFullYear(), 0, 1).getTime())
                    .subscribe(reportModel => {
                        this.report = reportModel;
                        this.parseData();
                    });
            });
        this.currentYear = new Date().getFullYear();
    }

    ngAfterViewInit() {
        this.width = document.getElementById('graph_container').clientWidth;
    }

    parseData() {
        this.title = this.mainHub.name;
        const graphData = [];
        graphData.push(['Master Loads', this.report.master_loads, 'MediumSeaGreen', this.report.master_loads.toString(10)]);
        if (this.report.regionalhubs.length > 0) {
            this.report.regionalhubs.forEach(hub => {
                graphData.push([hub.name, hub.load_count, 'gold', hub.load_count.toString(10)]);
                hub.pods.forEach(pod => {
                    graphData.push([pod.name, pod.load_count, 'blue', pod.load_count.toString(10)]);
                });
            });
        }
        this.data = graphData;
    }

    onYearSelected() {
        const button = document.getElementById('date');
        button.innerText = this.currentYear;
        const startTime = new Date(new Date().getFullYear(), 0, 1).getTime();
        this.reportService.getReportsFromTime(this.mainHub['id'], startTime)
            .subscribe(reportModel => {
                this.report = reportModel;
                this.parseData();
            });
    }

    onMonthSelected() {
        const button = document.getElementById('date');
        button.innerText = 'Last Month';
        const date = new Date();
        const startTime = new Date().setDate(date.getDate() - 30);
        this.reportService.getReportsFromTime(this.mainHub['id'], startTime)
            .subscribe(reportModel => {
                this.report = reportModel;
                this.parseData();
            });
    }

    ngOnDestroy() {
    }
}
