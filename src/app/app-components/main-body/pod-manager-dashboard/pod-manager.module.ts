import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../app-modules/material.module';

import {PodManagerDashboardComponent} from './pod-manager-dashboard.component';
import {LoadResourceComponent} from './load-resource/load-resource.component';

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
      LoadResourceComponent
    ],
    exports: [
      PodManagerDashboardComponent,
      LoadResourceComponent
    ],
})
export class PodManagerModule {

}
