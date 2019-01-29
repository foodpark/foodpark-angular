import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { DataService } from 'src/app/app-services/data.service';
import { FileUploadService } from 'src/app/app-services/fileupload.service';
import { MasterLoadService } from 'src/app/app-services/master-load.service';
import { MainhubService } from 'src/app/app-services/mainhub.service';

@Component({
    selector: 'app-create-master',
    templateUrl: './create-master-load.component.html',
})
export class CreateMasterLoadComponent implements OnInit {
    createMasterForm: FormGroup;
    wordfileURL: string;
    wordFileToUpload: File;
    mainHubId: number;
    hideFileContainer = false;

    private fileUploadSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private dataService: DataService,
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
                this.createMaterLoad();
            });

        this.mainhubService.getMainhubOfLoggedInUser(localStorage.getItem('user_id'))
            .subscribe((response) => {
                this.mainHubId = response[0]['id'];
            });
    }


    onFilePicked(files: FileList) {
        this.wordFileToUpload = files.item(0);
        this.hideFileContainer = this.dataService.nullCheck(this.wordFileToUpload);
        document.getElementById('wordfile_name').innerText = this.wordFileToUpload.name;
    }

    createMaster() {
        this.fileUploadService.uploadFile(this.wordFileToUpload);
    }

    createMaterLoad() {

        const obj = {
            main_hub_id: this.mainHubId,
            excelfile: this.wordfileURL,
            name: this.createMasterForm.value.name
        };
        this.masterLoadService.addMasterLoad(obj)
            .subscribe(response => {
                this.router.navigate(['/hubmanager/loadmanagement']);
            });

    }
}
