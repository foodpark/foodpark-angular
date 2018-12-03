import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PodsService} from '../../../../../app-services/pods.service';
import {MainhubService} from 'src/app/app-services/mainhub.service';


@Component({
    selector: 'app-volunteers',
    templateUrl: './volunteers.component.html',

})
export class VolunteersComponent implements OnInit {
    newvolunteersform: FormGroup;
    allvolunters: any;
    mainHub: any;
    mainhubId: any;
    territoryid: number;
    newvolunterpopup: any;

    constructor(private podsService: PodsService,
                private mainhubService: MainhubService, private formBuilder: FormBuilder) {
        this.getmainhubid();
        this.volunteerInitform();
        this.newvolunterpopup = false;
    }

    volunteerInitform() {
        this.newvolunteersform = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            contact: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    getmainhubid() {
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
                this.mainhubId = this.mainHub.id;
                this.territoryid = this.mainHub.territory_id;
                console.log(this.mainHub);
                this.getAllVolunteers();
            });
    }

    getAllVolunteers() {
        this.podsService.apiGetVolunteers(this.mainhubId).subscribe((response) => {
            this.allvolunters = response;
            console.log('this is all users', this.allvolunters);
        }, (error) => {

        });
    }

    createVolunteers() {
        const reqobj = {
            'role': 'DRIVER',
            'first_name': this.newvolunteersform.get('firstname').value,
            'last_name': this.newvolunteersform.get('lastname').value,
            'phone': this.newvolunteersform.get('contact').value,
            'email': this.newvolunteersform.get('username').value,
            'password': this.newvolunteersform.get('password').value,
            'territory_id': this.territoryid,
            'food_park_id': this.mainhubId,
        };
        this.podsService.Apicreatevolunteers(reqobj).subscribe((response) => {
            console.log('this is new volunter', reponse);
            this.newvolunterpopup = false;
            this.getAllVolunteers();
        }, (error) => {

        });
    }

    ngOnInit() {

    }

}
