import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../app-components/main-body/login/login.component';
import {AdminDashboardComponent} from '../app-components/main-body/admin-dashboard/admin-dashboard.component';
import {CustomerDashboardComponent} from '../app-components/main-body/customer-dashboard/customer-dashboard.component';
import {OwnerDashboardComponent} from '../app-components/main-body/owner-dashboard/owner-dashboard.component';
import {UnitManagerDashboardComponent} from '../app-components/main-body/unit-manager-dashboard/unit-manager-dashboard.component';
import {DriverDashboardComponent} from '../app-components/main-body/driver-dashboard/driver-dashboard.component';
import {FoodparkManagerDashboardComponent} from '../app-components/main-body/foodpark-manager-dashboard/foodpark-manager-dashboard.component';

import {HubManagerDashboardComponent} from '../app-components/main-body/hub-manager-dashboard/hub-manager-dashboard.component';
import {RegionalHubComponent} from '../app-components/main-body/hub-manager-dashboard/regionalhub/regionalhub.component';
import {ReportingComponent} from '../app-components/main-body/hub-manager-dashboard/reporting/reporting.component';
import {PodApplicationsComponent} from '../app-components/main-body/hub-manager-dashboard/pod-applications/pod-applications.component';
import {CreatePodsComponent} from '../app-components/main-body/hub-manager-dashboard/pod-applications/create-pods/create-pods.component';
import {PodsComponent} from '../app-components/main-body/hub-manager-dashboard/pod-applications/pods/pods.component';

import {LoadManagementComponent} from '../app-components/main-body/hub-manager-dashboard/load-management/load-management.component';
import {HubPickupsComponent} from '../app-components/main-body/hub-manager-dashboard/hub-pickups/hub-pickups.component';
import {HubManagerComponent} from '../app-components/main-body/hub-manager-dashboard/hub-manager/hub-manager.component';
import {DistributionCenterComponent} from '../app-components/main-body/hub-manager-dashboard/distrubution-center/distrubution-center.component';


import {NewHubManagerComponent} from '../app-components/main-body/admin-dashboard/NewHubManager/new-hub-manager.component';
import {TerritoriesComponent} from '../app-components/main-body/admin-dashboard/territories/territories.component';
// import {TerritoriesComponent}                           from '../app-components/main-body/territories/territories.component';
import {MainHubsComponent} from '../app-components/main-body/main-hubs/main-hubs.component';
import {AuthGuard} from '../app-services/auth.guard';
import {AddAndEditTerritoryComponent} from '../app-components/main-body/add-and-edit-territory/add-and-edit-territory.component';


const routes: Routes = [
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: LoginComponent, children: []
    },
    {
        path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], children: [
            {
                path: 'territories', component: TerritoriesComponent, children: []
            },
            {
                path: 'create_main_hub', component: MainHubsComponent, children: []
            },
            {
                path: 'new_main_hub_manager', component: NewHubManagerComponent, children: []
            },
            {
                path: 'edit_territory', component: AddAndEditTerritoryComponent, children: []
            }
        ]
    },
    {
        path: 'customer', component: CustomerDashboardComponent, canActivate: [AuthGuard], children: []
    },
    {
        path: 'owner', component: OwnerDashboardComponent, canActivate: [AuthGuard], children: []
    },
    {
        path: 'unitmanager', component: UnitManagerDashboardComponent, canActivate: [AuthGuard], children: []
    },
    {
        path: 'driver', component: DriverDashboardComponent, canActivate: [AuthGuard], children: []
    },
    {
        path: 'foodparkmanager', component: FoodparkManagerDashboardComponent, canActivate: [AuthGuard], children: []
    },
    {
        path: 'hubmanager', component: HubManagerDashboardComponent, canActivate: [AuthGuard],
        children: [
            {path: 'create_regional_hub', component: RegionalHubComponent},
            {path: 'reporting', component: ReportingComponent},
            {
                path: 'pod_applications', component: PodApplicationsComponent,
                children: [
                    {path: '', redirectTo: 'pods', pathMatch: 'full', canActivate: [AuthGuard]},
                    {path: 'pods', component: PodsComponent},
                    {path: 'create-pods', component: CreatePodsComponent},
                ]
            },
            {path: 'load_management', component: LoadManagementComponent},
            {path: 'hub_pickups', component: HubPickupsComponent},
            {path: 'hub_manager', component: HubManagerComponent},
            {path: 'distribution_center_management', component: DistributionCenterComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {
}
