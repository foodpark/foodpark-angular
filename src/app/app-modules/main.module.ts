import {NgModule} from '@angular/core';
import {DashboardComponent} from '../app-components/main-body/business-container/dashboard/dashboard.component';
import {FormsComponent} from '../app-components/main-body/business-container/forms/forms.component';
import {MainBodyComponent} from '../app-components/main-body/main-body.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AdminDashboardComponent} from '../app-components/main-body/business-container/admin-dashboard/admin-dashboard.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule
    ],
    declarations: [
        DashboardComponent,
        FormsComponent,
        MainBodyComponent,
        AdminDashboardComponent,
    ],
    exports: [
        DashboardComponent,
        FormsComponent,
        MainBodyComponent
    ],
})

export class MainModule {

}
