import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DistributionService } from '../../../../../app-services/distribution-center.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';
import { VolunteerModel } from 'src/app/model';

@Component({
    selector: 'app-gik-donations',
    templateUrl: './gik-donations.component.html'
})

export class GIKDonationsComponent implements OnInit {
    mainHub: any;
    mainid: number;
    allordersdata: any;
    regionalhubs: any;
    mainHubName: any;
    selectedid: number;
    ordersdata: any;
    volunteersList:  VolunteerModel[] = [];
    orderstatusvalue: string;
    filteredVolunteers: any;

    constructor(
        private router: Router,
        private distributionservice: DistributionService,
        private mainhubService: MainhubService,
        private formBuilder: FormBuilder) {
        }

    getMainHub() {
        this.mainhubService
            .getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe(response => {
                if (response.length > 0) {
                    this.mainHub = response[0];
                    this.mainid = this.mainHub.id;
                    this.mainHubName = this.mainHub.name;
                    this.getAllOrders();
                }
            });
    }

    getAllOrders() {
        this.distributionservice.getOrderDetails(this.mainid)
        .subscribe(response => {
            this.ordersdata = response;
            this.allordersdata = this.ordersdata.regionalhubs;
        });
    }

    expandAccordian(orders, i) {
        this.ordersdata = orders;
        this.selectedid = orders.id;

        this.distributionservice.getAvailableVolunteers(this.mainid)
        .subscribe(response => {
            this.volunteersList = response;
            this.filteredVolunteers = this.volunteersList.filter(el => {
                return el.is_deleted === false && el.available === true;
            });
        });
    }

    onVolunteerClick(index: number, item) {
        const button = document.getElementById('volunteer_button');
        button.innerText = this.volunteersList[index]['username'];

        let reqobj = {
            driver_id: item.id,
            driver_name: item.username
        };
        // UPDATEING THE Driver STATUS
        this.distributionservice
        .updateVolunteer(reqobj, this.selectedid)
        .subscribe(response => {
            this.getAllOrders();
        });
    }

    onStatusClick(element) {
        this.orderstatusvalue = element.currentTarget.value;
        console.log('button staus', this.orderstatusvalue);
        const statusReq = {
            status: this.orderstatusvalue
        };
        // UPDATEING THE ORDER STATUS
        this.distributionservice
        .updateStatus(statusReq, this.selectedid)
        .subscribe(response => {
            this.getAllOrders();
        });
    }

    ngOnInit() {
        this.getMainHub();
    }
}
