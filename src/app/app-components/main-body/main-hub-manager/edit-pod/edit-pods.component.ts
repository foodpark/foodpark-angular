import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PodModel} from '../../../../model';
import {PodsService} from 'src/app/app-services/pods.service';

@Component({
    selector: 'app-edit-pods',
    templateUrl: './edit-pods.component.html',
})

export class EditPodsComponent implements OnInit, OnDestroy {
    editpodform: FormGroup;
    podId: number;
    pods: PodModel[] = [];
    churchType = ['Church', 'Non-Profit', 'Non-Religious', 'Non-Denominational', 'Other'];
    connectedBy = ['Personal Referral', 'Google Search', 'Social Media', 'Other'];

    constructor(private formBuilder: FormBuilder,
                private route: Router,
                private podService: PodsService) {
    }

    ngOnInit() {
        this.pods = JSON.parse(localStorage.getItem('editpod'));
        this.editpodform = this.formBuilder.group({
            name: [this.pods['name'], Validators.required],
            latitude: [this.pods['latitude'], Validators.required],
            longitude: [this.pods['longitude'], Validators.required],
            sponsor: [this.pods['sponsor'], Validators.required],
            title: [this.pods['title'], Validators.required],
            connected_with: [this.pods['connected_with'], Validators.required],
            type: [this.pods['type'], Validators.required],
            // wordFile: [null, Validators.required]
        });
        this.podId = this.pods['id'];
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
            this.route.navigate(['/hubmanager/podapplications']);
        });
    }

    onFilePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.editpodform.get('wordFile').setValue(file);
        this.editpodform.get('wordFile').updateValueAndValidity();
    }

    ngOnDestroy() {
        localStorage.removeItem('editpod');
    }
}
