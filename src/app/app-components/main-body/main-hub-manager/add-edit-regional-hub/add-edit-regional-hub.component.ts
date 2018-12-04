import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegionalHubModel, MainhubModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DataService} from '../../../../app-services/data.service';
import {RegionalhubsService} from '../../../../app-services/regionalhubs.service';
import {MainhubService} from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-add-edit-regional-hub',
    templateUrl: './add-edit-regional-hub.component.html',
})
export class AddEditRegionalHubComponent implements OnInit, OnDestroy {
    mainHub: MainhubModel;
    regionalHubForm: FormGroup;
    regionalHubs;
    pageTitle = '';
    isCreate = false;
    regionalHubId;
    private regionalHubsSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private regionalService: RegionalhubsService,
                private router: Router,
                private route: ActivatedRoute,
                private dataService: DataService,
                private mainhubService: MainhubService) {
    }

    ngOnInit() {
        this.regionalHubForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHub = response[0];
            });

        this.regionalHubsSubscription = this.regionalService.getRegionalHubsUpdateListener()
            .subscribe((regionalHubs: RegionalHubModel[]) => {
                this.regionalHubs = regionalHubs;
            });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('regionalHubId')) {
                this.isCreate = false;
                this.pageTitle = 'Edit Regional Hub';
                this.regionalHubId = paramMap.get('regionalHubId');
                this.regionalService.getRegionalHubFromId(this.regionalHubId).subscribe(res => {
                    this.regionalHubs = res;
                    this.regionalHubForm.get('name').setValue(this.regionalHubs['name'], {emitEvent: false});
                });
            } else {
                this.isCreate = true;
                this.pageTitle = 'Add Regional Hub';
            }
        });
    }


    get f() {
        return this.regionalHubForm.controls;
    }

    onCreateRegionalHubClick() {
        if (this.isCreate) {
            const obj = {
                'name': this.regionalHubForm.get('name').value,
                'food_park_id': this.mainHub.id
            };
            this.regionalService.addRegionalHub(obj);
            this.router.navigate(['/hubmanager/regionalhubs']);
        } else {
            const obj = {
                'name': this.regionalHubForm.get('name').value,
                'id': JSON.parse(localStorage.getItem('regionalhub'))['id']
            };
            this.regionalService.editRegionalHub(obj);
            this.router.navigate(['/hubmanager/regionalhubs']);
        }
    }

    ngOnDestroy() {
        if (this.dataService.nullCheck(this.regionalHubsSubscription)) {
            this.regionalHubsSubscription.unsubscribe();
        }
    }
}
