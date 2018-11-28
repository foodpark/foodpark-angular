import {NgModule} from '@angular/core';
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [],
    entryComponents: [],
})
export class MaterialModule {
}
