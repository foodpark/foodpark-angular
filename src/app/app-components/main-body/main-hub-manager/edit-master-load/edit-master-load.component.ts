import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DataService} from '../../../../app-services/data.service';
import {FileUploadService} from '../../../../app-services/fileupload.service';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
    selector: 'app-edit-master-load',
    templateUrl: './edit-master-load.component.html',
})
export class EditMasterLoadComponent implements OnInit {

    editMasterForm: FormGroup;
    private fileURL: string;
    private wordFileToUpload: File;
    mainHubId: number;
    hideFileContainer = false;
    masterLoadId;
    masterLoads;
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
            });
    }


    onFilePicked(files: FileList) {
        this.wordFileToUpload = files.item(0);
        this.hideFileContainer = this.dataService.nullCheck(this.wordFileToUpload);
        this.fileURL = this.wordFileToUpload['name'];
    }

    editMaster() {
        const obj = {
            ...this.editMasterForm.value,
            main_hub_id: this.mainHubId
        };
        this.masterLoadService.addMasterLoad(obj).subscribe();
        this.fileUploadService.uploadFile(this.wordFileToUpload);
        this.router.navigate(['/hubmanager/loadmanagement']);
    }

}
