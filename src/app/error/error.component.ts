import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    templateUrl: './error.component.html',
    selector: 'app-error',
    styleUrls: ['./error.component.scss']
})

export class ErrorComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    }

    closeDialog() {
        document.getElementById('error-dialog').style.display = 'none';
        const div = document.getElementsByClassName('cdk-overlay-container')[0];
        div.classList.add('remove-error-dialog');
    }
}
