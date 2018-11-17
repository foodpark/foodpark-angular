import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../../../../app-services/data.service';
import { AuthService } from '../../../../app-services/auth.service';

import { from } from 'rxjs';
@Component({
  selector: 'regional-hub',
  templateUrl: './regionalhub.component.html',

})
export class RegionalHubComponent implements OnInit {
  activatedroute: any;
  mainHubDetails : any;
  createRegionName : any;
  MainHubName : any;
  FoodParkId : any;
  createRegion : any;

  constructor(private dataService: DataService, public authService: AuthService,private activateroute: ActivatedRoute,) {
    this.activatedroute = this.activateroute;
    console.log('this is response data',this.activatedroute);

    this.gethubname();
    //this.logindata();


  }

  gethubname(){
    let authData = this.authService.getAuthData();
    let parms = "?type=MAIN&foodpark_mgr=" + authData.id;

    this.authService.apiGetMainHUbDetails(parms)
      .subscribe((response) => {
        this.mainHubDetails = response;
        this.MainHubName = this.mainHubDetails[0].name;
        this.FoodParkId = this.mainHubDetails[0].id;
        console.log(this.mainHubDetails[0].name);
      }, (error) => {
      console.log(error);
      });
  }

  createRegionHub(){
    this.createRegion = {
      "name" : this.createRegionName,
      "food_park_id" : this.FoodParkId
    };
    this.authService.apiCreaateRegionHub(this.createRegion)
      .subscribe((response) => {
        console.log(response);
        this.createRegionName = "";
      }, (error) => {
      console.log(error);
      });
  }




  ngOnInit() {

  }

}
