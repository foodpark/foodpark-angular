import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ParamMap, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PodModel} from '../../../../model';
import {PodsService} from 'src/app/app-services/pods.service';

@Component({
    selector: 'app-edit-pods',
    templateUrl: './edit-pods.component.html',
})

export class EditPodsComponent implements OnInit, OnDestroy {
    editpodform: FormGroup;
    podId;
    pods: PodModel[] = [];
    churchType = ['Church', 'Non-Profit', 'Non-Religious', 'Non-Denominational', 'Other'];
    connectedBy = ['Personal Referral', 'Google Search', 'Social Media', 'Other'];

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private podService: PodsService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('pods')) {
                this.podId = JSON.parse(paramMap['params']['pods'])['id'];
                this.podService.getPodFromPodId(this.podId).subscribe(res => {
                    this.editpodform = this.formBuilder.group({
                        name: [res['name'], Validators.required],
                        latitude: [res['latitude'], Validators.required],
                        longitude: [res['longitude'], Validators.required],
                        sponsor: [res['sponsor'], Validators.required],
                        title: [res['title'], Validators.required],
                        connected_with: [res['connected_with'], Validators.required],
                        type: [res['type'], Validators.required],
                        // wordFile: [null, Validators.required]
                    });
                    document.getElementById('church_type').innerText = this.editpodform.get('type').value;
                    document.getElementById('connected_with').innerText = this.editpodform.get('connected_with').value;
                });
            }
        });
    }

    onChurchTypeClick(type: string) {
        const button = document.getElementById('church_type');
        button.innerText = type;
        this.editpodform.get('type').setValue(type);
    }

    onConnectedByClick(type: string) {
        const button = document.getElementById('connected_with');
        button.innerText = type;
        this.editpodform.get('connected_with').setValue(type);
    }

    savePod() {
        const updatePodObj = {
            'name': this.editpodform.get('name').value,
            'title': this.editpodform.get('title').value,
            'connected_with': this.editpodform.get('connected_with').value,
            'sponsor': this.editpodform.get('sponsor').value,
            'latitude': this.editpodform.get('latitude').value,
            'longitude': this.editpodform.get('longitude').value,
            'type': this.editpodform.get('type').value,
            'approved': true
        };

        this.podService.updatePod(this.podId, updatePodObj)
            .subscribe(() => {
                this.router.navigate(['/hubmanager/podapplications']);
            });
    }

    onFilePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.editpodform.get('wordFile').setValue(file);
        this.editpodform.get('wordFile').updateValueAndValidity();
    }

    ngOnDestroy() {
    }
}
