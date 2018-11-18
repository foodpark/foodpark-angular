import {NgModule} from '@angular/core';
import {LoginComponent} from '../app-components/main-body/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AdminDashboardComponent} from '../app-components/main-body/admin-dashboard/admin-dashboard.component';
import {TerritoriesComponent} from '../app-components/main-body/admin-dashboard/territories/territories.component';
import {NewHubManagerComponent} from '../app-components/main-body/admin-dashboard/NewHubManager/new-hub-manager.component';

import {MainHubsComponent} from '../app-components/main-body/main-hubs/main-hubs.component';
import {CustomerDashboardComponent} from '../app-components/main-body/customer-dashboard/customer-dashboard.component';
import {OwnerDashboardComponent} from '../app-components/main-body/owner-dashboard/owner-dashboard.component';
import {UnitManagerDashboardComponent} from '../app-components/main-body/unit-manager-dashboard/unit-manager-dashboard.component';
import {FoodparkManagerDashboardComponent} from '../app-components/main-body/foodpark-manager-dashboard/foodpark-manager-dashboard.component';
import {DriverDashboardComponent} from '../app-components/main-body/driver-dashboard/driver-dashboard.component';

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

import {RemoveSpacesPipe} from '../app-pipes/removeSpaces.pipe';
import {DropdownModule} from '../app-components/main-body/dropdown/dropdown.module';
import {EditTerritoryComponent} from '../app-components/main-body/edit-territory/edit-territory.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        DropdownModule
    ],
    declarations: [
        LoginComponent,
        AdminDashboardComponent,
        TerritoriesComponent,
        NewHubManagerComponent,
        EditTerritoryComponent,
        MainHubsComponent,
        CustomerDashboardComponent,
        OwnerDashboardComponent,
        UnitManagerDashboardComponent,
        FoodparkManagerDashboardComponent,
        DriverDashboardComponent,
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
        RemoveSpacesPipe
    ],
    exports: [
        LoginComponent,
        AdminDashboardComponent,
        TerritoriesComponent,
        NewHubManagerComponent,
        EditTerritoryComponent,
        MainHubsComponent,
        CustomerDashboardComponent,
        OwnerDashboardComponent,
        UnitManagerDashboardComponent,
        FoodparkManagerDashboardComponent,
        DriverDashboardComponent,
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
    ],
})
export class MainModule {

}
