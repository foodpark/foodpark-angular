import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    allregisteredvolunters: any;
    objresponse: any;
    userid: any;
    registereduserid: any;

    constructor(
        private distributionservice: DistributionService,
        private mainhubService: MainhubService,
        private formBuilder: FormBuilder
    ) {
        this.getMainHub();
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

    getMainHub() {
        this.mainhubService
            .getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe(response => {
                if (response.length > 0) {
                    this.mainHub = response[0];
                    this.mainhubId = this.mainHub.id;
                    this.territoryid = this.mainHub.territory_id;
                    console.log(this.mainHub);
                    this.getAllVolunteers();
                }
            });
    }

    getAllVolunteers() {
        this.distributionservice.getVolunteers(this.mainhubId).subscribe(
            response => {
                this.allvolunters = response;
                console.log('this is all users', this.allvolunters);
                this.getRegisteredVolunteers();
            },
            error => {}
        );
    }

    getRegisteredVolunteers() {
        this.distributionservice
            .getRegisteredVolunteers(this.territoryid)
            .subscribe(
                response => {
                    this.allregisteredvolunters = response;
                    for (
                        let i = 0;
                        i < this.allregisteredvolunters.length;
                        i++
                    ) {
                        for (let j = 0; j < this.allvolunters.length; j++) {
                            if (
                                this.allregisteredvolunters[i].id ===
                                this.allvolunters[j].id
                            ) {
                                this.allregisteredvolunters[i].selected = true;
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
        this.distributionservice.createVolunteer(reqobj).subscribe(
            response => {
                console.log('this is new volunter', response);
                this.newvolunterpopup = false;
                this.getRegisteredVolunteers();
            },
            error => {}
        );
    }

    Addvolunter(data) {
        this.objresponse = data;
        console.log('this.objresponse', this.objresponse);
        const obj = {
            name: this.objresponse.first_name + this.objresponse.last_name,
            phone: this.objresponse.phone,
            user_id: this.objresponse.id
        };
        this.distributionservice.addVolunteers(this.mainhubId, obj).subscribe(
            response => {
                this.getAllVolunteers();
                this.getRegisteredVolunteers();
            },
            error => {}
        );
    }

    switchChanged(event, avilableid) {
        console.log('event here->', event);
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
            .updateAvilablity(this.mainhubId, avilableid, avilData)
            .subscribe(
                response => {
                    this.getAllVolunteers();
                    this.getRegisteredVolunteers();
                },
                error => {}
            );
    }

    deletevolunteer(deleteid) {
        this.distributionservice
            .deleteVolunteer(this.mainhubId, deleteid)
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
