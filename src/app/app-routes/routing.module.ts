import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../app-components/main-body/login/login.component';
import {AdminDashboardComponent} from '../app-components/main-body/admin/admin-dashboard/admin-dashboard.component';

import {HubManagerDashboardComponent} from '../app-components/main-body/main-hub-manager/hub-manager-dashboard/hub-manager-dashboard.component';
import {RegionalHubComponent} from '../app-components/main-body/main-hub-manager/regionalhub/regionalhub.component';
import {ReportingComponent} from '../app-components/main-body/main-hub-manager/reporting/reporting.component';
import {PodApplicationsComponent} from '../app-components/main-body/main-hub-manager/pod-applications/pod-applications.component';
import {CreatePodsComponent} from '../app-components/main-body/main-hub-manager/pod-applications/create-pods/create-pods.component';
import {PodsComponent} from '../app-components/main-body/main-hub-manager/pod-applications/pods/pods.component';

import {LoadManagementComponent} from '../app-components/main-body/main-hub-manager/load-management/load-management.component';
import {HubPickupsComponent} from '../app-components/main-body/main-hub-manager/hub-pickups/hub-pickups.component';
import {HubManagerComponent} from '../app-components/main-body/main-hub-manager/hub-manager/hub-manager.component';
import {DistributionCenterComponent} from '../app-components/main-body/main-hub-manager/distrubution-center/distrubution-center.component';


import {NewHubManagerComponent} from '../app-components/main-body/admin/NewHubManager/new-hub-manager.component';
import {TerritoriesComponent} from '../app-components/main-body/admin/territories/territories.component';
import {AuthGuard} from '../app-services/auth.guard';
import {AddAndEditTerritoryComponent} from '../app-components/main-body/admin/add-and-edit-territory/add-and-edit-territory.component';
import {AddAndEditMainhubComponent} from '../app-components/main-body/admin/add-and-edit-mainhub/add-and-edit-mainhub.component';
import {MainHubComponent} from '../app-components/main-body/admin/main-hub/main-hub.component';


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
                path: 'mainhub', component: MainHubComponent, children: []
            },
            {
                path: 'mainhubmanager', component: NewHubManagerComponent, children: []
            },
            {
                path: 'edit_territory', component: AddAndEditTerritoryComponent, children: []
            },
            {
                path: 'addterritory', component: AddAndEditTerritoryComponent, children: []
            },
            {
                path: 'editmainhub', component: AddAndEditMainhubComponent, children: []
            }
        ]
    },
    {
        path: 'hubmanager', component: HubManagerDashboardComponent, canActivate: [AuthGuard],
        children: [
            {path: 'createregionalhub', component: RegionalHubComponent},
            {path: 'reporting', component: ReportingComponent},
            {
                path: 'podapplications', component: PodApplicationsComponent,
                children: [
                    {path: '', redirectTo: 'pods', pathMatch: 'full', canActivate: [AuthGuard]},
                    {path: 'pods', component: PodsComponent},
                    {path: 'createpods', component: CreatePodsComponent},
                ]
            },
            {path: 'loadmanagement', component: LoadManagementComponent},
            {path: 'hubpickups', component: HubPickupsComponent},
            {path: 'hubmanager', component: HubManagerComponent},
            {path: 'distributioncentermanagement', component: DistributionCenterComponent},
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
