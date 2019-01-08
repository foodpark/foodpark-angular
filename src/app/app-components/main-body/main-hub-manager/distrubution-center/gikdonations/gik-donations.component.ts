import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DistributionService } from '../../../../../app-services/distribution-center.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
  selector: 'app-gik-donations',
  templateUrl: './gik-donations.component.html',

})
export class GIKDonationsComponent implements OnInit {
  mainHub: any;
  mainid : number;
  allordersdata : any;
  regionalhubs : any;
  mainHubName : any;
  selectedid : number;
  ordersdata : any;
  volunteerslist : any;
  orderstatusvalue : string;
  constructor(private router: Router,  private distributionservice: DistributionService, private mainhubService: MainhubService, private formBuilder: FormBuilder) {
    this.getMainHub();

  }

  getMainHub() {
      this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
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
    this.distributionservice.getOrderDetails(this.mainid).subscribe(
          response => {
              this.ordersdata = response;
              this.allordersdata = this.ordersdata.regionalhubs;

              console.log('this is all users', this.allordersdata);
          },
          error => {}
      );
  }

  openaccordian(orders,i){
    this.ordersdata = orders;
    this.selectedid   = orders.id;
    console.log('this is orders', this.ordersdata.name)
    this.getAvilablityVolunteerData();
  }

  getAvilablityVolunteerData(){
    this.distributionservice.getAvilablityVolunteers(this.mainid).subscribe(
        response => {
            this.volunteerslist = response;
            console.log('this is all users', this.volunteerslist);
        },
        error => {}
    );
  }

  onVolunteerClick(index: number, item) {
    const button = document.getElementById('volunteer_button');
    button.innerText = this.volunteerslist[index]['name'];
    console.log('this clicked',item);
    let reqobj = {
      "driver_id": item.id,
	     "driver_name": item.name
    }
    // UPDATEING THE Driver STATUS
   this.distributionservice.OnVolunteerUpdate(reqobj,this.selectedid).subscribe(
     response => {
         this.getAllOrders();
     },
     error => {}
   );

  }

  StatusClick(element){
    this.orderstatusvalue = element.currentTarget.value;
    console.log('button staus',this.orderstatusvalue);
    let statusReq = {
      "status" : this.orderstatusvalue,
    }
     // UPDATEING THE ORDER STATUS
    this.distributionservice.OnStatusUpdate(statusReq,this.selectedid).subscribe(
      response => {
          //this.volunteerslist = response;
          console.log('this is all users', this.selectedid);
          this.getAllOrders();
      },
      error => {}
    );

  }



  ngOnInit() {

  }

}
