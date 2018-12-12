import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {Subscription} from 'rxjs';
import {MasterLoadModel} from '../../../../model';

@Component({
    selector: 'app-load-management',
    templateUrl: './load-management.component.html',

})
export class LoadManagementComponent implements OnInit, OnDestroy {
    masterLoadSubscription: Subscription;
    masterLoads: MasterLoadModel[] = [];

    constructor(private router: Router,
                private masterLoadService: MasterLoadService) {
    }

    ngOnInit() {
        this.masterLoadService.getAllMasterLoads();
        this.masterLoadSubscription = this.masterLoadService.getMasterUpdateListener()
            .subscribe(res => {
                this.masterLoads = res;
            });
    }

    onCreateLoadMasterClick() {
        this.router.navigate(['/hubmanager/createmasterload']);
    }

    onCreateDonationClick() {
        this.router.navigate(['/hubmanager/createdonationorder']);
    }


    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editmasterload', {masterLoadId: this.masterLoads[index]['id']}]);
    }

    onDeleteClick(index: number) {
        this.masterLoadService.deleteMasterLoad(index).subscribe(() => {
            this.masterLoadService.getAllMasterLoads();
        });
    }

    ngOnDestroy() {
        this.masterLoadSubscription.unsubscribe();
    }
}
