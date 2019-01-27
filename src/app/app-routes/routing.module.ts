import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../app-components/main-body/admin/admin-dashboard/admin-dashboard.component';

import { HubManagerDashboardComponent } from '../app-components/main-body/main-hub-manager/hub-manager-dashboard/hub-manager-dashboard.component';
import { RegionalHubComponent } from '../app-components/main-body/main-hub-manager/regionalhub/regionalhub.component';
import { CreatePodsComponent } from '../app-components/main-body/main-hub-manager/create-pods/create-pods.component';
import { PodsComponent } from '../app-components/main-body/main-hub-manager/pods/pods.component';

import { LoadManagementComponent } from '../app-components/main-body/main-hub-manager/load-management/load-management.component';
import { HubPickupsComponent } from '../app-components/main-body/main-hub-manager/hub-pickups/hub-pickups.component';
import { HubManagerComponent } from '../app-components/main-body/main-hub-manager/hub-manager/hub-manager.component';
import { DistributionCenterComponent } from '../app-components/main-body/main-hub-manager/distrubution-center/distrubution-center.component';
import { VolunteersComponent } from '../app-components/main-body/main-hub-manager/distrubution-center/volunteers/volunteers.component';

import { AuthGuard } from '../app-services/auth.guard';
import { AddEditRegionalHubComponent } from '../app-components/main-body/main-hub-manager/add-edit-regional-hub/add-edit-regional-hub.component';
import { EditPodsComponent } from '../app-components/main-body/main-hub-manager/edit-pod/edit-pods.component';
import { PodManagersListingComponent } from '../app-components/main-body/main-hub-manager/pod-managers/pod-managers-listing/pod-managers-listing.component';
import { EditHubpickupComponent } from '../app-components/main-body/main-hub-manager/edit-hubpickup/edit-hubpickup.component';
import { HubPickupListingComponent } from '../app-components/main-body/main-hub-manager/hub-pickup-listing/hub-pickup-listing.component';
import { EditPodManagerComponent } from '../app-components/main-body/main-hub-manager/pod-managers/edit-pod-manager/edit-pod-manager.component';
import { GIKDonationsComponent } from '../app-components/main-body/main-hub-manager/distrubution-center/gikdonations/gik-donations.component';

import { CreateDonationOrderComponent } from '../app-components/main-body/main-hub-manager/create-donation-order/create-donation-order.component';
import { CreateMasterLoadComponent } from '../app-components/main-body/main-hub-manager/create-master-load/create-master-load.component';
import { EditMasterLoadComponent } from '../app-components/main-body/main-hub-manager/edit-master-load/edit-master-load.component';
import { CustomizeLoadComponent } from '../app-components/main-body/main-hub-manager/customize-load/customize-load.component';
import { AdminReportingComponent } from '../app-components/main-body/admin/admin-reporting/admin-reporting.component';
import { HubManagerReportingComponent } from '../app-components/main-body/main-hub-manager/hub-manager-reporting/hub-manager-reporting.component';
import { PodPickupsListingComponent } from '../app-components/main-body/main-hub-manager/pod-pickups-listing/pod-pickups-listing.component';
import { AddEditPodPickupComponent } from '../app-components/main-body/main-hub-manager/add-edit-podpickup/add-edit-podpickup.component';
import { LoginComponent } from '../app-components/main-body/initial/login/login.component';
import { GuestCreatePodsComponent } from '../app-components/main-body/initial/guest-create-pods/guest-create-pods.component';
import { TerritoriesListingComponent } from '../app-components/main-body/admin/territories/territories-listing/territories-listing.component';
import { AddEditTerritoryComponent } from '../app-components/main-body/admin/territories/add-edit-territory/add-edit-territory.component';
import { MainHubsListingComponent } from '../app-components/main-body/admin/mainhubs/main-hubs-listing/main-hubs-listing.component';
import { AddEditMainhubComponent } from '../app-components/main-body/admin/mainhubs/add-edit-mainhub/add-edit-mainhub.component';
import { MainhubManagerListingComponent } from '../app-components/main-body/admin/mainhubmanager/mainhub-manager-listing/mainhub-manager-listing.component';
import { AddEditMainHubManagerComponent } from '../app-components/main-body/admin/mainhubmanager/add-edit-main-hub-manager/add-edit-main-hub-manager.component';
import { AddEditResourceComponent } from '../app-components/main-body/pod-manager/load-resource/add-edit-resource/add-edit-resource.component';
import { PodManagerDashboardComponent } from '../app-components/main-body/pod-manager/pod-manager-dashboard/pod-manager-dashboard.component';
import { LoadResourceComponent } from '../app-components/main-body/pod-manager/load-resource/load-resource-listing/load-resource-listing.component';
import { OrderManagmentComponent } from '../app-components/main-body/pod-manager/ordermanagment/ordermanagment.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: LoginComponent
    },
    {
        path: 'guest-create-pod',
        component: GuestCreatePodsComponent
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'territories',
                component: TerritoriesListingComponent,
                children: []
            },
            {
                path: 'editterritory',
                component: AddEditTerritoryComponent,
                children: []
            },
            {
                path: 'addterritory',
                component: AddEditTerritoryComponent,
                children: []
            },
            {
                path: 'mainhubs',
                component: MainHubsListingComponent,
                children: []
            },
            {
                path: 'editmainhub/:mainhubId',
                component: AddEditMainhubComponent,
                children: []
            },
            {
                path: 'createmainhub',
                component: AddEditMainhubComponent,
                children: []
            },
            {
                path: 'mainhubmanagers',
                component: MainhubManagerListingComponent,
                children: []
            },
            {
                path: 'addmainhubmanager',
                component: AddEditMainHubManagerComponent,
                children: []
            },
            {
                path: 'editmainhubmanager',
                component: AddEditMainHubManagerComponent,
                children: []
            },
            {
                path: 'adminreporting',
                component: AdminReportingComponent
            }
        ]
    },
    {
        path: 'hubmanager',
        component: HubManagerDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'regionalhubs',
                component: RegionalHubComponent
            },
            {
                path: 'hubmgrreporting',
                component: HubManagerReportingComponent
            },
            {
                path: 'addregionalhub',
                component: AddEditRegionalHubComponent,
                children: []
            },
            {
                path: 'editregionalhub',
                component: AddEditRegionalHubComponent,
                children: []
            },
            {
                path: 'podapplications',
                component: PodsComponent,
                children: []
            },
            {
                path: 'editpod',
                component: EditPodsComponent
            },
            {
                path: 'createpod',
                component: CreatePodsComponent
            },
            {
                path: 'loadmanagement',
                component: LoadManagementComponent
            },
            {
                path: 'hubpickups',
                component: HubPickupListingComponent
            },
            {
                path: 'edithubpickup',
                component: EditHubpickupComponent
            },
            {
                path: 'addhubpickup',
                component: HubPickupsComponent
            },
            {
                path: 'hubmanager',
                component: HubManagerComponent
            },
            {
                path: 'distributioncentermanagement',
                component: DistributionCenterComponent,
                children: [
                    { path: '', redirectTo: 'gikdonations', pathMatch: 'full' },
                    {
                        path: 'gikdonations',
                        component: GIKDonationsComponent
                    },
                    {
                        path: 'volunteers',
                        component: VolunteersComponent
                    }
                ]
            },
            {
                path: 'podmanagers',
                component: PodManagersListingComponent
            },
            {
                path: 'editpodmanager/:podmanagerid',
                component: EditPodManagerComponent
            },
            {
                path: 'createmasterload',
                component: CreateMasterLoadComponent,
                children: []
            },
            {
                path: 'editmasterload',
                component: EditMasterLoadComponent,
                children: []
            },
            {
                path: 'createdonationorder',
                component: CreateDonationOrderComponent,
                children: []
            },
            {
                path: 'customizeLoad',
                component: CustomizeLoadComponent,
                children: []
            },
            {
                path: 'addeditloadresource/:id/:src',
                component: AddEditResourceComponent,
                children: []
            },
            {
                path: 'podpickups',
                component: PodPickupsListingComponent,
                children: []
            },
            {
                path: 'addeditpodpickup',
                component: AddEditPodPickupComponent,
                children: []
            }
        ]
    },
    {
        path: 'podmanager',
        component: PodManagerDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'loadresources',
                component: LoadResourceComponent
            },
            {
                path: 'addeditloadresource/:id',
                component: AddEditResourceComponent
            },
            {
                path: 'orderstatus',
                component: OrderManagmentComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
