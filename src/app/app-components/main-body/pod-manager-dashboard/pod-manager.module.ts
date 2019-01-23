import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../app-modules/material.module';

import {PodManagerDashboardComponent} from './pod-manager-dashboard.component';
import {LoadResourceComponent} from './load-resource/load-resource.component';
import {AddEditResourceComponent} from './add-edit-resource/add-edit-resource.component';
import { OrderManagmentComponent } from './ordermanagment/ordermanagment.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
      PodManagerDashboardComponent,
      LoadResourceComponent,
      AddEditResourceComponent,
      OrderManagmentComponent
    ],
    exports: [
      PodManagerDashboardComponent,
      LoadResourceComponent,
      AddEditResourceComponent
    ],
})
export class PodManagerModule {

}
