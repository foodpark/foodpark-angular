import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../app-modules/material.module';
import { GoogleChartsModule } from 'angular-google-charts';

import { HubManagerDashboardComponent } from './hub-manager-dashboard/hub-manager-dashboard.component';
import { DistributionCenterComponent } from './distrubution-center/distrubution-center.component';
import { VolunteersComponent } from './distrubution-center/volunteers/volunteers.component';
import { RemoveSpacesPipe } from '../../../app-pipes/removeSpaces.pipe';
import { PodManagersListingComponent } from './pod-managers/pod-managers-listing/pod-managers-listing.component';
import { EditPodManagerComponent } from './pod-managers/edit-pod-manager/edit-pod-manager.component';

import { GIKDonationsComponent } from './distrubution-center/gikdonations/gik-donations.component';
import { CreateDonationOrderComponent } from './create-donation-order/create-donation-order.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CustomizeLoadComponent } from './customize-load/customize-load.component';

import { HubmanagerReportingGraphsComponent } from './hubmanager-reporting-graphs/hubmanager-reporting-graphs.component';
import { RegionalHubComponent } from './regionalhub/regionalhublisting/regionalhub.component';
import { PodsComponent } from './pod-applications/pods-listing/pods.component';
import { CreatePodsComponent } from './pod-applications/create-pods/create-pods.component';
import { LoadManagementComponent } from './master-load/load-management/load-management.component';
import { HubPickupsComponent } from './hub-pickup/hub-pickups/hub-pickups.component';
import { AddEditRegionalHubComponent } from './regionalhub/add-edit-regional-hub/add-edit-regional-hub.component';
import { EditPodsComponent } from './pod-applications/edit-pod/edit-pods.component';
import { EditHubpickupComponent } from './hub-pickup/edit-hubpickup/edit-hubpickup.component';
import { HubPickupListingComponent } from './hub-pickup/hub-pickup-listing/hub-pickup-listing.component';
import { CreateMasterLoadComponent } from './master-load/create-master-load/create-master-load.component';
import { EditMasterLoadComponent } from './master-load/edit-master-load/edit-master-load.component';
import { PodPickupsListingComponent } from './podpickup/pod-pickups-listing/pod-pickups-listing.component';
import { AddEditPodPickupComponent } from './podpickup/add-edit-podpickup/add-edit-podpickup.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        MaterialModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        GoogleChartsModule
    ],
    declarations: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
        PodsComponent,
        CreatePodsComponent,
        LoadManagementComponent,
        HubPickupsComponent,
        HubManagerDashboardComponent,
        DistributionCenterComponent,
        VolunteersComponent,
        GIKDonationsComponent,
        RemoveSpacesPipe,
        AddEditRegionalHubComponent,
        EditPodsComponent,
        PodManagersListingComponent,
        EditPodManagerComponent,
        HubPickupListingComponent,
        EditHubpickupComponent,
        CreateMasterLoadComponent,
        EditMasterLoadComponent,
        CreateDonationOrderComponent,
        EditMasterLoadComponent,
        CustomizeLoadComponent,
        PodPickupsListingComponent,
        AddEditPodPickupComponent,
        HubmanagerReportingGraphsComponent
    ],
    exports: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
        PodsComponent,
        CreatePodsComponent,
        LoadManagementComponent,
        HubPickupsComponent,
        HubManagerDashboardComponent,
        DistributionCenterComponent,
        VolunteersComponent,
        GIKDonationsComponent,
        RemoveSpacesPipe,
        AddEditRegionalHubComponent,
        CreateMasterLoadComponent,
        EditMasterLoadComponent
    ]
})
export class MainHubManagerModule {}
