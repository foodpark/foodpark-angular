import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CountryService} from '../../../../app-services/country.service';
import {CountryModel} from '../../../../model';
import {Subscription} from 'rxjs';
import {PodsService} from 'src/app/app-services/pods.service';

@Component({
    selector: 'app-edit-pods',
    templateUrl: './edit-pods.component.html',
})

export class EditPodsComponent implements OnInit {
    editpodform: FormGroup;
    podId: number;
    churchType = ['Church', 'Non-Profit', 'Non-Religious', 'Non-Denominational', 'Other'];
    connectedBy = ['Church', 'Non-Profit', 'Non-Religious', 'Other'];

    constructor(private formBuilder: FormBuilder,
                private route: Router,
                private countryService: CountryService,
                private podService: PodsService) {
    }

    ngOnInit() {
        this.editpodform = this.formBuilder.group({
            church_name: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            sponsor: ['', Validators.required],
            title: ['', Validators.required],
            connectedBy: ['', Validators.required],
            // uploadAttachments: [null, Validators.required],
            type : ['', Validators.required],
            // wordFile: [null, Validators.required]
        });
    }

    onChurchTypeClick(type: string) {
        const button = document.getElementById('church_type');
        button.innerText = type;
        this.editpodform.get('type').setValue(type);
    }

    onConnectedByClick(type: string) {
        const button = document.getElementById('connected_by');
        button.innerText = type;
        this.editpodform.get('connectedBy').setValue(type);
    }

    createPod() {
        const updatePodObj = {
            'title': this.editpodform.get('title').value,
            'connected_with': this.editpodform.get('connectedBy').value,
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
}
