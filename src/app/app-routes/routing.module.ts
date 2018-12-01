import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../app-components/main-body/login/login.component';
import {AdminDashboardComponent} from '../app-components/main-body/admin/admin-dashboard/admin-dashboard.component';

import {HubManagerDashboardComponent} from '../app-components/main-body/main-hub-manager/hub-manager-dashboard/hub-manager-dashboard.component';
import {RegionalHubComponent} from '../app-components/main-body/main-hub-manager/regionalhub/regionalhub.component';
import {ReportingComponent} from '../app-components/main-body/main-hub-manager/reporting/reporting.component';
import {CreatePodsComponent} from '../app-components/main-body/main-hub-manager/create-pods/create-pods.component';
import {PodsComponent} from '../app-components/main-body/main-hub-manager//pods/pods.component';

import {LoadManagementComponent} from '../app-components/main-body/main-hub-manager/load-management/load-management.component';
import {HubPickupsComponent} from '../app-components/main-body/main-hub-manager/hub-pickups/hub-pickups.component';
import {HubManagerComponent} from '../app-components/main-body/main-hub-manager/hub-manager/hub-manager.component';
import {DistributionCenterComponent} from '../app-components/main-body/main-hub-manager/distrubution-center/distrubution-center.component';
import {VolunteersComponent} from '../app-components/main-body/main-hub-manager/distrubution-center/volunteers/volunteers.component';


import {AuthGuard} from '../app-services/auth.guard';
import {MainHubsListingComponent} from '../app-components/main-body/admin/main-hubs-listing/main-hubs-listing.component';
import {MainhubManagerListingComponent} from '../app-components/main-body/admin/mainhub-manager-listing/mainhub-manager-listing.component';
import {TerritoriesListingComponent} from '../app-components/main-body/admin/territories-listing/territories-listing.component';
import {AddEditTerritoryComponent} from '../app-components/main-body/admin/add-edit-territory/add-edit-territory.component';
import {AddEditMainhubComponent} from '../app-components/main-body/admin/add-edit-mainhub/add-edit-mainhub.component';
import {AddEditMainHubManagerComponent} from '../app-components/main-body/admin/add-edit-main-hub-manager/add-edit-main-hub-manager.component';
import {AddEditRegionalHubComponent} from '../app-components/main-body/main-hub-manager/add-edit-regional-hub/add-edit-regional-hub.component';
import {EditPodsComponent} from '../app-components/main-body/main-hub-manager/edit-pod/edit-pods.component';
import {PodManagersListingComponent} from '../app-components/main-body/main-hub-manager/pod-managers/pod-managers-listing/pod-managers-listing.component';
import {EditHubpickupComponent} from '../app-components/main-body/main-hub-manager/edit-hubpickup/edit-hubpickup.component';
import {HubPickupListingComponent} from '../app-components/main-body/main-hub-manager/hub-pickup-listing/hub-pickup-listing.component';
import {PodManagerDashboardComponent} from '../app-components/main-body/main-hub-manager/pod-manager-dashboard/pod-manager-dashboard.component';



const routes: Routes = [
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: LoginComponent
    },
    {
        path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], children: [
            {
                path: 'territories', component: TerritoriesListingComponent, children: []
            },
            {
                path: 'editterritory', component: AddEditTerritoryComponent, children: []
            },
            {
                path: 'addterritory', component: AddEditTerritoryComponent, children: []
            },
            {
                path: 'mainhubs', component: MainHubsListingComponent, children: []
            },
            {
                path: 'editmainhub', component: AddEditMainhubComponent, children: []
            },
            {
                path: 'mainhubmanagers', component: MainhubManagerListingComponent, children: []
            },
            {
                path: 'addmainhubmanager', component: AddEditMainHubManagerComponent, children: []
            },
            {
                path: 'editmainhubmanager', component: AddEditMainHubManagerComponent, children: []
            }
        ]
    },
    {
        path: 'hubmanager', component: HubManagerDashboardComponent, canActivate: [AuthGuard],
        children: [
            {
                path: 'regionalhubs', component: RegionalHubComponent
            },
            {
                path: 'reporting', component: ReportingComponent
            },
            {
                path: 'addregionalhub', component: AddEditRegionalHubComponent, children: []
            },
            {
                path: 'editregionalhub', component: AddEditRegionalHubComponent, children: []
            },
            {
                path: 'podapplications', component: PodsComponent, children: []
                // children: [
                // {
                //     path: '', redirectTo: 'pods', pathMatch: 'full', canActivate: [AuthGuard]
                // },
                // {
                //     path: 'pods', component: PodsComponent
                // },
                // {
                //     path: 'createpods', component: CreatePodsComponent
                // },
                // {
                //     path: 'editpods', component: AddEditPodsComponent, children: []
                // },
                // ]
            },
            {
                path: 'editpod', component: EditPodsComponent
            },
            {
                path: 'createpod', component: CreatePodsComponent
            },
            {
                path: 'loadmanagement', component: LoadManagementComponent
            },
            {
                path: 'hubpickups', component: HubPickupListingComponent
            },
            {
                path: 'edithubpickup', component: EditHubpickupComponent
            },
            {
                path: 'addhubpickup', component: HubPickupsComponent
            },
            {
                path: 'hubmanager', component: HubManagerComponent
            },
            {
                path: 'distributioncentermanagement', component: DistributionCenterComponent,
                children: [
                    {path: 'volunteers', component: VolunteersComponent}
                ]
            },
            {
                path: 'podmanagers', component: PodManagersListingComponent
            }
        ]
    }
    {path:'podmanager', component:PodManagerDashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {
}
