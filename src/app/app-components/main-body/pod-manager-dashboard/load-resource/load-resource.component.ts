import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PodsService} from '../../../../app-services/pods.service';
import {PodsManagerService} from '../../../../app-services/pod-manager.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';



@Component({
  selector: 'app-loadresource',
  templateUrl: './load-resource.component.html',

})
export class LoadResourceComponent implements OnInit {
  allvolunters: any;
  mainHub: any;
  mainhubId: any;
  newvolunterpopup : any;
  territoryid: any;
  loadrequests:any;

  constructor(private podsService: PodsService, private PodsManagerService: PodsManagerService,
                private mainhubService: MainhubService,private formBuilder: FormBuilder) {
    this.getmainhubid();
    this.getLoadRequests();
    //this.newvolunterpopup = false;
  }

  getmainhubid() {
    this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
    .subscribe((response) => {
        this.mainHub = response[0];
        // this.mainhubId = this.mainHub.id;
        // this.territoryid = this.mainHub.territory_id;
        // console.log(this.mainHub);
    });
  }
  getLoadRequests() {
    this.PodsManagerService.apigetLoadRequests()
    .subscribe((response) => {
        this.loadrequests = response;
        console.log('this is load requests',this.loadrequests);
    });
  }

  ngOnInit() {
    this.getLoadRequests();
  }

}
