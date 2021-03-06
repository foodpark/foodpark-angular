import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DistributionService } from '../../../../../app-services/distribution-center.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';
import { MainhubModel } from 'src/app/model';

@Component({
    selector: 'app-volunteers',
    templateUrl: './volunteers.component.html'
})
export class VolunteersComponent implements OnInit {
    allvolunters: any;
    mainHub: MainhubModel;
    newvolunterpopup: any;
    newvolunteersform: any;
    allregisteredvolunters: any;
    objresponse: any;

    constructor(
        private distributionservice: DistributionService,
        private mainhubService: MainhubService,
        private formBuilder: FormBuilder
    ) {
        this.getMainHub();
        this.newvolunteersform = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            contact: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    getMainHub() {
        this.mainhubService
            .getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe(response => {
                if (response.length > 0) {
                    this.mainHub = response[0];
                    // this.mainhubId = this.mainHub.id;
                    // this.territoryid = this.mainHub.territory_id;
                    this.getAllVolunteers();
                }
            });
    }

    getAllVolunteers() {
        this.distributionservice.getVolunteers(this.mainHub.id)
        .subscribe(response => {
            this.allvolunters = response;
            this.getRegisteredVolunteers();
        });
    }

    getRegisteredVolunteers() {
        this.distributionservice.getRegisteredVolunteers(this.mainHub.territory_id)
        .subscribe(response => {
            this.allregisteredvolunters = response;
            for (let i = 0; i < this.allregisteredvolunters.length; i++) {
                for (let j = 0; j < this.allvolunters.length; j++) {
                    if (this.allregisteredvolunters[i].id === this.allvolunters[j].id) {
                        this.allregisteredvolunters[i].selected = true;
                    }
                }
            }
        });
    }

    createVolunteer() {
        const reqobj = {
            role: 'DRIVER',
            first_name: this.newvolunteersform.get('firstname').value,
            last_name: this.newvolunteersform.get('lastname').value,
            phone: this.newvolunteersform.get('contact').value,
            email: this.newvolunteersform.get('username').value,
            password: this.newvolunteersform.get('password').value,
            territory_id: this.mainHub.territory_id,
            food_park_id: this.mainHub.id
        };

        this.distributionservice.createVolunteer(reqobj).subscribe(
            response => {
                this.newvolunterpopup = false;
                this.getRegisteredVolunteers();
            },
            error => {}
        );
    }

    addVolunteer(data) {
        this.objresponse = data;
        const obj = {
            name: this.objresponse.first_name + this.objresponse.last_name,
            phone: this.objresponse.phone,
            user_id: this.objresponse.id
        };
        this.distributionservice.addVolunteers(this.mainHub.id, obj).subscribe(
            response => {
                this.getAllVolunteers();
                this.getRegisteredVolunteers();
            },
            error => {}
        );
    }

    changeVolunteereStatus(event, avilableid) {
        let avilData;
        if (event.srcElement.checked) {
            avilData = {
                available: true
            };
        } else {
            avilData = {
                available: false
            };
        }

        // api call
        this.distributionservice
            .updateAvilablity(this.mainHub.id, avilableid, avilData)
            .subscribe(
                response => {
                    this.getAllVolunteers();
                    this.getRegisteredVolunteers();
                },
                error => {}
            );
    }

    deleteVolunteer(deleteid) {
        this.distributionservice
            .deleteVolunteer(this.mainHub.id, deleteid)
            .subscribe(
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
