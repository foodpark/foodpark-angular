import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploadService} from '../../../../app-services/fileupload.service';
import {Subscription} from 'rxjs';
import {MasterLoadService} from '../../../../app-services/master-load.service';
import {MainhubService} from '../../../../app-services/mainhub.service';
import {MainhubModel} from '../../../../model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-master',
    templateUrl: './create-master.component.html',
})
export class CreateMasterComponent implements OnInit {
    createMasterForm: FormGroup;
    private wordfileURL: string;
    private wordFileToUpload: File;
    mainHubId: number;

    private fileUploadSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private fileUploadService: FileUploadService,
                private masterLoadService: MasterLoadService,
                private mainhubService: MainhubService,
                private router: Router) {
    }

    ngOnInit() {
        this.createMasterForm = this.fb.group({
            name: ['', Validators.required],
            excelfile: ['']
        });

        this.fileUploadSubscription = this.fileUploadService.getFileUploadListener()
            .subscribe((fileURL) => {
                console.log('File Uploaded: ' + fileURL);
                this.wordfileURL = fileURL;
            });

        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHubId = response[0]['id'];
            });
    }


    onFilePicked(files: FileList) {
        this.wordFileToUpload = files.item(0);
        document.getElementById('wordfile_name').innerText = this.wordFileToUpload.name;
    }

    createMaster() {
        const obj = {
            ...this.createMasterForm.value,
            main_hub_id: this.mainHubId
        };
        this.masterLoadService.addMasterLoad(obj).subscribe();
        this.router.navigate(['/hubmanager/loadmanagement']);
    }

}
