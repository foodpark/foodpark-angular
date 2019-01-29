import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { DataService } from 'src/app/app-services/data.service';
import { FileUploadService } from 'src/app/app-services/fileupload.service';
import { MasterLoadService } from 'src/app/app-services/master-load.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-edit-master-load',
    templateUrl: './edit-master-load.component.html',
})
export class EditMasterLoadComponent implements OnInit {

    editMasterForm: FormGroup;
    fileURL: string;
    wordFileToUpload: File;
    mainHubId: number;
    hideFileContainer = false;
    masterLoadId;
    masterLoads;
    isFileChanged = false;
    private fileUploadSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private dataService: DataService,
                private fileUploadService: FileUploadService,
                private masterLoadService: MasterLoadService,
                private mainhubService: MainhubService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.editMasterForm = this.fb.group({
            name: ['', Validators.required],
            excelfile: ['']
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('masterLoadId')) {
                this.masterLoadId = paramMap.get('masterLoadId');
                this.masterLoadService.getMasterLoadFromId(this.masterLoadId).subscribe(masterLoad => {
                    this.masterLoads = masterLoad;
                    this.fileURL = this.masterLoads['excelfile'];
                    this.editMasterForm.get('name').setValue(this.masterLoads['name'], {emitEvent: false});
                });
            }
        });
        this.fileUploadSubscription = this.fileUploadService.getFileUploadListener()
            .subscribe((fileURL) => {
                console.log('File Uploaded: ' + fileURL);
                this.fileURL = fileURL;
                this.editMasterLoad();
            });
    }


    onFilePicked(files: FileList) {
        this.wordFileToUpload = files.item(0);
        this.hideFileContainer = this.dataService.nullCheck(this.wordFileToUpload);
        this.fileURL = this.wordFileToUpload['name'];
    }

    editMasterLoad() {
        const obj = {
            name: this.editMasterForm.value['name'],
            excelfile: this.fileURL
        };
        this.masterLoadService.updateMasterLoad(this.masterLoads['id'], obj).subscribe();
        this.router.navigate(['/hubmanager/loadmanagement']);
    }

    editMaster() {
        if (this.isFileChanged) {
            this.fileUploadService.uploadFile(this.wordFileToUpload);
        } else {
            const obj = {
                name: this.editMasterForm.value['name']
            };
            this.masterLoadService.updateMasterLoad(this.masterLoads['id'], obj).subscribe();
            this.router.navigate(['/hubmanager/loadmanagement']);
        }

    }

}
