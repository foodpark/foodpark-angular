import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ParamMap, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PodsService} from 'src/app/app-services/pods.service';
import {FileUploadService} from 'src/app/app-services/fileupload.service';
import {Subscription} from 'rxjs';
import {PodModel} from 'src/app/model';

@Component({
    selector: 'app-edit-pods',
    templateUrl: './edit-pods.component.html'
})

export class EditPodsComponent implements OnInit, OnDestroy {
    editpodform: FormGroup;
    podId: string;
    pod: any; // PodModel;
    churchType = [
        'Church',
        'Non-Profit',
        'Non-Religious',
        'Non-Denominational',
        'Other'
    ];

    connectedBy = [
        'Personal Referral',
        'Google Search',
        'Social Media',
        'Other'
    ];
    wordfileURL: string;
    wordFileToUpload: File;
    private fileUploadSubscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private podService: PodsService,
        private fileUploadService: FileUploadService
    ) {
    }

    ngOnInit() {
        this.editpodform = this.formBuilder.group({
            pod_name: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            sponsor: ['', Validators.required],
            title: ['', Validators.required],
            connected_with: ['', Validators.required],
            type: ['', Validators.required]
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('podId')) {
                this.podId = paramMap.get('podId');
                this.podService.getPodFromPodId(parseInt(this.podId, 10))
                    .subscribe(res => {
                        this.pod = res;
                        this.wordfileURL = this.pod.wordfile;
                        this.editpodform.get('pod_name').setValue(this.pod['name'], {emitEvent: false});
                        this.editpodform.get('latitude').setValue(this.pod['latitude'], {emitEvent: false});
                        this.editpodform.get('longitude').setValue(this.pod['longitude'], {emitEvent: false});
                        this.editpodform.get('sponsor').setValue(this.pod['sponsor'], {emitEvent: false});
                        this.editpodform.get('title').setValue(this.pod['title'], {emitEvent: false});
                        this.editpodform.get('connected_with').setValue(this.pod['connected_with'], {emitEvent: false});
                        this.editpodform.get('type').setValue(this.pod['type'], {emitEvent: false});
                        document.getElementById('church_type').innerText = this.editpodform.get('type').value;
                        document.getElementById('connected_with').innerText = this.editpodform.get('connected_with').value;
                    });
            }
        });

        this.fileUploadSubscription = this.fileUploadService.getFileUploadListener()
            .subscribe((fileURL) => {
                this.wordfileURL = fileURL;
                this.uploadPod();
            });
    }

    onChurchTypeClick(type: string) {
        document.getElementById('church_type').innerText = type;
        this.editpodform.get('type').setValue(type);
    }

    onConnectedByClick(type: string) {
        document.getElementById('connected_with').innerText = type;
        this.editpodform.get('connected_with').setValue(type);
    }

    onFilePicked(files: FileList) {
        this.wordFileToUpload = files.item(0);
        this.editpodform.get('wordFile').setValue(this.wordFileToUpload);
        document.getElementById('wordfile_name').innerText = this.wordFileToUpload.name;
    }

    savePod() {
        if (this.wordFileToUpload === null || this.wordFileToUpload === undefined) {
            this.uploadPod();
        } else {
            this.fileUploadService.uploadFile(this.wordFileToUpload);
        }
    }

    uploadPod() {
        const updatePodData = {
            'name': this.editpodform.value.pod_name,
            'title': this.editpodform.value.title,
            'connected_with': this.editpodform.value.connectedBy,
            'sponsor': this.editpodform.value.sponsor,
            'latitude': this.editpodform.value.latitude,
            'longitude': this.editpodform.value.longitude,
            'type': this.editpodform.value.type,
            'wordfile': this.wordfileURL
        };

        this.podService.updatePod(parseInt(this.podId, 10), updatePodData)
            .subscribe(() => {
                this.router.navigate(['/hubmanager/podapplications']);
            });
    }

    ngOnDestroy() {
        this.fileUploadSubscription.unsubscribe();
    }
}
