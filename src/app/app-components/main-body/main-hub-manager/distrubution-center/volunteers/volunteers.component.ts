import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PodsService } from '../../../../../app-services/pods.service';
import { DistributionService } from '../../../../../app-services/distribution-center.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-volunteers',
    templateUrl: './volunteers.component.html'
})

export class VolunteersComponent implements OnInit {
    allvolunters: any;
    mainHub: any;
    mainhubId: any;
    newvolunterpopup: any;
    newvolunteersform: any;
    territoryid: any;
    allregisteredvolunters:any;
    objresponse : any
    userid : any;
    registereduserid: any;


    constructor(private distributionservice: DistributionService,private mainhubService: MainhubService,private formBuilder: FormBuilder) {
      this.getmainhubid();
      this.volunteerInitform();
    }

    volunteerInitform() {
        this.newvolunteersform = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            contact: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    getmainhubid() {
        this.mainhubService
            .getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe(response => {
                if (response.length > 0) {
                    this.mainHub = response[0];
                    this.mainhubId = this.mainHub.id;
                    this.territoryid = this.mainHub.territory_id;
                    console.log(this.mainHub);
                    this.getAllVolunteers();
                    this.getRegisteredVolunteers();
                }
            });
    }

    getAllVolunteers() {
        this.distributionservice.apiGetVolunteers(this.mainhubId).subscribe(
            response => {
                this.allvolunters = response;

                console.log('this is all users', this.allvolunters);
            },
            error => {}
        );
    }

    getRegisteredVolunteers() {
        this.distributionservice.apiGetRegisteredVolunteers(this.territoryid).subscribe(
            response => {
                this.allregisteredvolunters = response;
                for(let i=0;i<this.allregisteredvolunters.length;i++){
                  for(let j=0;j<this.allvolunters.length;j++){
                    if(this.allregisteredvolunters[i].id == this.allvolunters[j].id){
                      this.allregisteredvolunters[i].selected=true;
                    }
                  }
                }
            },
            error => {}
        );
    }

    createVolunteers() {
        const reqobj = {
            role: 'DRIVER',
            first_name: this.newvolunteersform.get('firstname').value,
            last_name: this.newvolunteersform.get('lastname').value,
            phone: this.newvolunteersform.get('contact').value,
            email: this.newvolunteersform.get('username').value,
            password: this.newvolunteersform.get('password').value,
            territory_id: this.territoryid,
            food_park_id: this.mainhubId
        };
        this.distributionservice.Apicreatevolunteers(reqobj).subscribe(
            response => {
                console.log('this is new volunter', response);
                this.newvolunterpopup = false;
                this.getAllVolunteers();
            },
            error => {}
        );
    }

    Addvolunter(data){
      this.objresponse = data;
      console.log('this.objresponse',this.objresponse);
      const obj = {
        name: this.objresponse.first_name,
        phone: this.objresponse.phone,
        user_id: this.objresponse.id
      }
      this.distributionservice.apiAddVolunteers(this.mainhubId,obj).subscribe(
        response => {
          this.getAllVolunteers();
          this.getRegisteredVolunteers();
        },
        error => {}
      );
    }

    // avilablityuser(avilableid) {
    //   const avilData = {
    //     available : true
    //   }
    //   this.distributionservice.Apiavilablitydata(this.mainhubId, avilableid).subscribe(
    //     response => {
    //       this.getAllVolunteers();
    //       this.getRegisteredVolunteers();
    //     },
    //     error => {}
    //   );
    // }

    deletevolunteer(deleteid) {
      this.distributionservice.Apideletevolunteers(this.mainhubId, deleteid).subscribe(
        response => {
          this.getAllVolunteers();
          this.getRegisteredVolunteers();
        },
        error => {}
      );
    }

    ngOnInit() {


        this.newvolunterpopup = false;
    }
}
