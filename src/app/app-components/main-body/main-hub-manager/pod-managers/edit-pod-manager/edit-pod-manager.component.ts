import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PodsService} from 'src/app/app-services/pods.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-add-edit-pod-managers',
    templateUrl: './edit-pod-manager.component.html',
})

export class EditPodManagerComponent implements OnInit, OnDestroy {
    editpodmanagerform: FormGroup;
    podManager: any;
    podManagerID: string;


    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private podService: PodsService) {
    }

    ngOnInit() {
        this.editpodmanagerform = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required],
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('podmanagerid')) {
                this.podManagerID = paramMap.get('podmanagerid');
                this.podService.getPodManager(this.podManagerID)
                    .subscribe((podmanager) => {
                        this.podManager = podmanager;
                        this.editpodmanagerform.get('firstname').setValue(this.podManager.first_name, {emitEvent: false});
                        this.editpodmanagerform.get('lastname').setValue(this.podManager.last_name, {emitEvent: false});
                        this.editpodmanagerform.get('email').setValue(this.podManager.username, {emitEvent: false});
                        this.editpodmanagerform.get('password').setValue(this.podManager.password, {emitEvent: false});
                        this.editpodmanagerform.get('repeatpassword').setValue(this.podManager.password, {emitEvent: false});
                    });
            }
        });
    }

    updatePodManager() {
        const obj = {
            'email': this.editpodmanagerform.get('email').value,
            'first_name': this.editpodmanagerform.get('firstname').value,
            'last_name': this.editpodmanagerform.get('lastname').value,
            'password': this.editpodmanagerform.get('password').value,
        };

        this.podService.updatePodManager(this.podManagerID, obj).subscribe();
    }

    ngOnDestroy() {
    }
}
