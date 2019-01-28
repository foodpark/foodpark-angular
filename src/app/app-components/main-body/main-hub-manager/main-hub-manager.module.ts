import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../app-modules/material.module';

import {HubManagerDashboardComponent} from './hub-manager-dashboard/hub-manager-dashboard.component';
import {RegionalHubComponent} from './regionalhub/regionalhub.component';
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
import {HubPickupListingComponent} from './hub-pickup-listing/hub-pickup-listing.component';
import {EditHubpickupComponent} from './edit-hubpickup/edit-hubpickup.component';
import {EditPodManagerComponent} from './pod-managers/edit-pod-manager/edit-pod-manager.component';

import {GIKDonationsComponent} from './distrubution-center/gikdonations/gik-donations.component';
import {CreateDonationOrderComponent} from './create-donation-order/create-donation-order.component';
import {EditMasterLoadComponent} from './edit-master-load/edit-master-load.component';
import {CreateMasterLoadComponent} from './create-master-load/create-master-load.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {CustomizeLoadComponent} from './customize-load/customize-load.component';
import {AgmCoreModule} from '@agm/core';
import {HubManagerReportingComponent} from './hub-manager-reporting/hub-manager-reporting.component';
import {TreeModule} from 'ng2-tree';
import {PodPickupsListingComponent} from './pod-pickups-listing/pod-pickups-listing.component';
import {AddEditPodPickupComponent} from './add-edit-podpickup/add-edit-podpickup.component';
import {HubmanagerReportingGraphsComponent} from './hubmanager-reporting-graphs/hubmanager-reporting-graphs.component';
import {BarChartComponent} from 'angular-d3-charts';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        MaterialModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCte3xKzZwcbVXm7942WDn1Twu2I0SAsoo'
        }),
        TreeModule,
    ],
    declarations: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
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
        EditHubpickupComponent,
        CreateMasterLoadComponent,
        EditMasterLoadComponent,
        CreateDonationOrderComponent,
        EditMasterLoadComponent,
        CustomizeLoadComponent,
        HubManagerReportingComponent,
        PodPickupsListingComponent,
        AddEditPodPickupComponent,
        HubmanagerReportingGraphsComponent,
        BarChartComponent
    ],
    exports: [
        HubManagerDashboardComponent,
        RegionalHubComponent,
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
        CreateMasterLoadComponent,
        EditMasterLoadComponent,
        HubManagerReportingComponent
    ],
})
export class MainHubManagerModule {

}
