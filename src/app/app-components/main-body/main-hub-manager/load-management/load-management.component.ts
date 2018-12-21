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
        this.router.navigate(['/hubmanager/createmaster']);
    }

    onCreateDonationClick() {
        this.router.navigate(['/hubmanager/createdonationorder']);
    }
    onDeleteClick(deleteid){
      console.log('delete',deleteid);
      this.masterLoadService.deleteMasterLoad(deleteid).subscribe(response=>{
        console.log('dleted successfully',deleteid);
        this.masterLoadService.getAllMasterLoads();
      })

    }

    ngOnDestroy() {
        this.masterLoadSubscription.unsubscribe();
    }
}
