import {NgModule} from '@angular/core';
import {DashboardComponent} from '../app-components/main-body/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AdminDashboardComponent} from '../app-components/main-body/admin-dashboard/admin-dashboard.component';
// import {TerritoriesComponent}                                      from '../app-components/main-body/territories/territories.component';
import {TerritoriesComponent} from '../app-components/main-body/admin-dashboard/territories/territories.component';
import {NewHubManagerComponent} from '../app-components/main-body/admin-dashboard/NewHubManager/new-hub-manager-dashboard.component';

import {MainHubsComponent} from '../app-components/main-body/main-hubs/main-hubs.component';
import {CustomerDashboardComponent} from '../app-components/main-body/customer-dashboard/customer-dashboard.component';
import {OwnerDashboardComponent} from '../app-components/main-body/owner-dashboard/owner-dashboard.component';
import {UnitManagerDashboardComponent} from '../app-components/main-body/unit-manager-dashboard/unit-manager-dashboard.component';
import {FoodparkManagerDashboardComponent} from '../app-components/main-body/foodpark-manager-dashboard/foodpark-manager-dashboard.component';
import {DriverDashboardComponent} from '../app-components/main-body/driver-dashboard/driver-dashboard.component';

import {HubManagerDashboardComponent} from '../app-components/main-body/hub-manager-dashboard/hub-manager-dashboard.component';
import {RegionalHubComponent} from '../app-components/main-body/hub-manager-dashboard/regionalhub/regionalhub.component';

import {RemoveSpacesPipe} from '../app-pipes/removeSpaces.pipe';
import {DropdownModule} from "../app-components/main-body/dropdown/dropdown.module";
import {EditTerritoryComponent} from "../app-components/main-body/edit-territory/edit-territory.component";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        DropdownModule
    ],
    declarations: [
        DashboardComponent,
        AdminDashboardComponent,
        TerritoriesComponent,
        EditTerritoryComponent,
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
        RemoveSpacesPipe
    ],
    exports: [
        DashboardComponent,
        AdminDashboardComponent,
        TerritoriesComponent,
        EditTerritoryComponent,
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
    ],
})
export class MainModule {

}
