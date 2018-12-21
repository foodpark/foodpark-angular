import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialModule} from '../../../../app-modules/material.module';

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
  newloadrequestform: any;
  popup1 : any;

  constructor(private podsService: PodsService, private PodsManagerService: PodsManagerService,
                private mainhubService: MainhubService,private route : Router,private formBuilder: FormBuilder) {
    this.getmainhubid();
    this.getLoadRequests();
    //this.newvolunterpopup = false;
  }
  requestInitform() {
    this.newloadrequestform = this.formBuilder.group({
      name: ['', Validators.required],
    });
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
        //this.boxesdata = response.boxes;
        //console.log('this is load requests',this.boxesdata);
    },(error)=>{

    });
  }

  createrequest(){
    const reqobj = {
      'name': this.newloadrequestform.get('name').value,
    };
    this.PodsManagerService.apicreateLoadRequests(reqobj)
    .subscribe((response) => {
        this.popup1 = true;
        this.getLoadRequests();
    },(error)=>{
      this.popup1 = false;

    });
  }

  clickAddEdit(id){
    this.route.navigate(['podmanager','add-edit',id]);
  }
  
  onclickDelete(deleteid){
    this.PodsManagerService.apideleteLoadRequests(deleteid)
    .subscribe((response) => {
        this.getLoadRequests();
    },(error)=>{

    });
  }

  ngOnInit() {
    this.requestInitform();
  }

}
