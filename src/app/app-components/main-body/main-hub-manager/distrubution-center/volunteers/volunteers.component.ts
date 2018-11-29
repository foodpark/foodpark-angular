import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PodsService} from '../../../../../app-services/pods.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';



@Component({
  selector: 'Volunteers',
  templateUrl: './volunteers.component.html',

})
export class VolunteersComponent implements OnInit {
  allvolunters: any;
  mainHub : any;
  mainhubId : any;
  constructor(private PodsService:PodsService, private mainhubService:MainhubService) {
    this.getmainhubid();

  }
  getmainhubid(){
    this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
    .subscribe((response) => {
        this.mainHub = response[0];
        this.mainhubId = this.mainHub.id;
        console.log(this.mainHub.id);
        this.getAllVolunteers();
    });

  }
  getAllVolunteers(){
    this.PodsService.apiGetVolunteers(this.mainhubId).subscribe((response)=>{
      this.allvolunters = response;
      console.log('this is all users',this.allvolunters)
    }, (error)=>{

    });
  }

  ngOnInit() {

  }

}
