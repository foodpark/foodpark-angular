import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {Subscription} from 'rxjs';
import {MasterLoadModel, MainhubModel} from '../../../../model';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-load-management',
    templateUrl: './load-management.component.html',

})
export class LoadManagementComponent implements OnInit, OnDestroy {
    mainHub: MainhubModel;
    masterLoadSubscription: Subscription;
    masterLoads: MasterLoadModel[] = [];

    constructor(private router: Router,
                private masterLoadService: MasterLoadService,
                private mainHubService: MainhubService) {
    }

    ngOnInit() {
        this.masterLoadSubscription = this.masterLoadService.getMasterUpdateListener()
        .subscribe(res => {
            this.masterLoads = res;
        });

        this.mainHubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
        .subscribe((response) => {
            this.mainHub = response[0];
            this.masterLoadService.getMasterLoadsInMainHub(this.mainHub.id);
        });
    }

    onCreateLoadMasterClick() {
        this.router.navigate(['/hubmanager/createmasterload']);
    }

    onCreateDonationClick() {
        this.router.navigate(['/hubmanager/createdonationorder']);
    }

    onDeleteClick(index: number) {
        this.masterLoadService.deleteMasterLoad(index).subscribe(() => {
            this.masterLoadService.getAllMasterLoads();
        });
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editmasterload', {masterLoadId: this.masterLoads[index]['id']}]);
    }

    ngOnDestroy() {
        this.masterLoadSubscription.unsubscribe();
    }
}
