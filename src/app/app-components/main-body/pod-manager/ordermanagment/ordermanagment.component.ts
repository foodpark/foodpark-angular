import { Component, OnInit } from '@angular/core';
import { VolunteerModel, PodModel } from 'src/app/model';
import { DistributionService } from 'src/app/app-services/distribution-center.service';
import { PodsManagerService } from 'src/app/app-services/pod-manager.service';

@Component({
    selector: 'app-ordermanagment',
    templateUrl: './ordermanagment.component.html'
})

export class OrderManagmentComponent implements OnInit {
    pod: PodModel;
    completeordersdata: any;
    ordersdata: any;
    mainHubName: any;
    selectedid: number;
    volunteersList: VolunteerModel[] = [];
    orderstatusvalue: string;
    filteredVolunteers: VolunteerModel[] = [];

    constructor(private podsManagerService: PodsManagerService,
                private distributionservice: DistributionService) {
    }

    ngOnInit() {
        this.podsManagerService.getPodOfLoggedInUser(parseInt(localStorage.getItem('user_id'), 10))
        .subscribe(pod => {
            this.pod = pod[0];
            this.getAllOrders();
        });
    }

    getAllOrders() {
        this.distributionservice.getPodOrderDetails(this.pod.id)
        .subscribe(response => {
            this.completeordersdata = response['orders'];
        });
    }

    expandAccordian(orders) {
        if (this.selectedid === undefined || this.selectedid !== orders.id) {
            this.ordersdata = orders;
            this.selectedid = orders.id;
        } else {
            this.selectedid = undefined;
        }
    }

    onVolunteerClick(index: number, item) {
        const displayName = item.first_name + ' ' + item.last_name;
        const button = document.getElementById('volunteer_button');
        button.innerText = displayName;

        const reqobj = {
            driver_id: item.id,
            driver_name: displayName
        };
        // UPDATEING THE Driver STATUS
        this.distributionservice.updateVolunteer(reqobj, this.selectedid)
        .subscribe(response => {
            this.getAllOrders();
        });
    }

    onStatusClick(element) {
        this.orderstatusvalue = element.currentTarget.value;
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
}
