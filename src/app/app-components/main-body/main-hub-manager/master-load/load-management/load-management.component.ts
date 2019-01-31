import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MainhubModel, MasterLoadModel} from 'src/app/model';
import {MainhubService} from 'src/app/app-services/mainhub.service';
import {MasterLoadService} from 'src/app/app-services/master-load.service';
import {DataService} from '../../../../../app-services/data.service';

@Component({
    selector: 'app-load-management',
    templateUrl: './load-management.component.html',

})
export class LoadManagementComponent implements OnInit, OnDestroy {
    mainHub: MainhubModel;
    masterLoadSubscription: Subscription;
    masterLoads: MasterLoadModel[] = [];

    constructor(private router: Router,
                private dataService: DataService,
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
                this.loadMasterLoadsForMainHub();
            });
    }

    loadMasterLoadsForMainHub() {
        this.masterLoadService.getMasterLoadsInMainHub(this.mainHub.id);
    }

    onCreateLoadMasterClick() {
        this.router.navigate(['/hubmanager/createmasterload']);
    }

    onCreateDonationClick() {
        localStorage.removeItem('loadId');
        this.dataService.loadIdFlag = false;
        this.router.navigate(['/hubmanager/createdonationorder']);
    }

    onDeleteClick(index: number) {
        this.masterLoadService.deleteMasterLoad(index).subscribe(() => {
            this.loadMasterLoadsForMainHub();
        });
    }

    onEditClick(index: number) {
        this.router.navigate(['/hubmanager/editmasterload', {masterLoadId: this.masterLoads[index]['id']}]);
    }

    ngOnDestroy() {
        this.masterLoadSubscription.unsubscribe();
    }
}
