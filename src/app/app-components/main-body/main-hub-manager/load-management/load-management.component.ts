import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-load-management',
    templateUrl: './load-management.component.html',

})
export class LoadManagementComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onCreateLoadMasterClick() {
        this.router.navigate(['/hubmanager/createmaster']);
    }

    onCreateDonationClick() {
        this.router.navigate(['/hubmanager/createdonationorder']);
    }
}
