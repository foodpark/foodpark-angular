import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../app-modules/material.module';

import {HubManagerDashboardComponent} from './hub-manager-dashboard/hub-manager-dashboard.component';
import {RegionalHubComponent} from './regionalhub/regionalhub.component';
import {ReportingComponent} from './reporting/reporting.component';
import {PodsComponent} from './pods/pods.component';
import {CreatePodsComponent} from './create-pods/create-pods.component';
import {LoadManagementComponent} from './load-management/load-management.component';
import {HubPickupsComponent} from './hub-pickups/hub-pickups.component';
import {HubManagerComponent} from './hub-manager/hub-manager.component';
import {DistributionCenterComponent} from './distrubution-center/distrubution-center.component';
import {VolunteersComponent} from './distrubution-center/volunteers/volunteers.component';
import {RemoveSpacesPipe} from '../../../app-pipes/removeSpaces.pipe';
import {AddEditRegionalHubComponent} from './add-edit-regional-hub/add-edit-regional-hub.component';
import {EditPodsComponent} from './edit-pod/edit-pods.component';
import {PodManagersListingComponent} from './pod-managers/pod-managers-listing/pod-managers-listing.component';
import { HubPickupListingComponent } from './hub-pickup-listing/hub-pickup-listing.component';
import { EditHubpickupComponent } from './edit-hubpickup/edit-hubpickup.component';
import { EditPodManagerComponent } from './pod-managers/edit-pod-manager/edit-pod-manager.component';

// import {PodManagerDashboardComponent} from './pod-manager-dashboard/pod-manager-dashboard.component';
import { GIKDonationsComponent } from './distrubution-center/gikdonations/gik-donations.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
        ReportingComponent,
        PodsComponent,
        CreatePodsComponent,
        LoadManagementComponent,
        HubPickupsComponent,
        HubManagerComponent,
        DistributionCenterComponent,
        VolunteersComponent,
        GIKDonationsComponent,
        RemoveSpacesPipe,
        AddEditRegionalHubComponent,
        EditPodsComponent,
        PodManagersListingComponent,
        EditPodManagerComponent,
        HubPickupListingComponent,
        EditHubpickupComponent

        // PodManagerDashboardComponent
    ],
    exports: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
        ReportingComponent,
        PodsComponent,
        CreatePodsComponent,
        LoadManagementComponent,
        HubPickupsComponent,
        HubManagerComponent,
        DistributionCenterComponent,
        VolunteersComponent,
        GIKDonationsComponent,
        RemoveSpacesPipe,
        AddEditRegionalHubComponent
        // PodManagerDashboardComponent
    ],
})
export class MainHubManagerModule {

}
