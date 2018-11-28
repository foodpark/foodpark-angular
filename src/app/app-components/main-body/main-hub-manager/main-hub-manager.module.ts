import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {HubManagerDashboardComponent} from './hub-manager-dashboard/hub-manager-dashboard.component';
import {RegionalHubComponent} from './regionalhub/regionalhub.component';
import {ReportingComponent} from './reporting/reporting.component';
import {PodApplicationsComponent} from './pod-applications/pod-applications.component';
import {PodsComponent} from './pods/pods.component';
import {CreatePodsComponent} from './create-pods/create-pods.component';
import {LoadManagementComponent} from './load-management/load-management.component';
import {HubPickupsComponent} from './hub-pickups/hub-pickups.component';
import {HubManagerComponent} from './hub-manager/hub-manager.component';
import {DistributionCenterComponent} from './distrubution-center/distrubution-center.component';
import {VolunteersComponent} from './distrubution-center/volunteers/volunteers.component';
import {RemoveSpacesPipe} from '../../../app-pipes/removeSpaces.pipe';
import {AddEditRegionalHubComponent} from './add-edit-regional-hub/add-edit-regional-hub.component';
import { EditPodsComponent } from './edit-pod/edit-pods.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule
    ],
    declarations: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
        ReportingComponent,
        PodApplicationsComponent,
        PodsComponent,
        CreatePodsComponent,
        LoadManagementComponent,
        HubPickupsComponent,
        HubManagerComponent,
        DistributionCenterComponent,
        VolunteersComponent,
        RemoveSpacesPipe,
        AddEditRegionalHubComponent,
        EditPodsComponent
    ],
    exports: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
        ReportingComponent,
        PodApplicationsComponent,
        PodsComponent,
        CreatePodsComponent,
        LoadManagementComponent,
        HubPickupsComponent,
        HubManagerComponent,
        DistributionCenterComponent,
        VolunteersComponent,
        RemoveSpacesPipe,
        AddEditRegionalHubComponent
    ],
})
export class MainHubManagerModule {

}
