import {NgModule} from '@angular/core';
import {DashboardComponent} from '../app-components/main-body/business-container/dashboard/dashboard.component';
import {FormsComponent} from '../app-components/main-body/business-container/forms/forms.component';
import {MainBodyComponent} from '../app-components/main-body/main-body.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AdminDashboardComponent} from '../app-components/main-body/business-container/admin-dashboard/admin-dashboard.component';
import {HubManagerComponent} from '../app-components/main-body/functional-components/hub-manager/hub-manager.component';
import {HubManagerDashboardComponent} from '../app-components/main-body/business-container/hub-manager-dashboard/hub-manager-dashboard.component';
import {DriverDashboardComponent} from '../app-components/main-body/business-container/driver-dashboard/driver-dashboard.component';
import {FoodparkManagerDashboardComponent} from '../app-components/main-body/business-container/foodpark-manager-dashboard/foodpark-manager-dashboard.component';
import {UnitManagerDashboardComponent} from '../app-components/main-body/business-container/unit-manager-dashboard/unit-manager-dashboard.component';
import {OwnerDashboardComponent} from '../app-components/main-body/business-container/owner-dashboard/owner-dashboard.component';
import {CustomerDashboardComponent} from '../app-components/main-body/business-container/customer-dashboard/customer-dashboard.component';
import {MainHubsComponent} from '../app-components/main-body/functional-components/main-hubs/main-hubs.component';
import {TerritoriesComponent} from '../app-components/main-body/functional-components/territories/territories.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule
    ],
    declarations: [
        DashboardComponent,
        FormsComponent,
        MainBodyComponent,
        AdminDashboardComponent,
        TerritoriesComponent,
        MainHubsComponent,
        CustomerDashboardComponent,
        OwnerDashboardComponent,
        UnitManagerDashboardComponent,
        FoodparkManagerDashboardComponent,
        DriverDashboardComponent,
        HubManagerDashboardComponent,
        HubManagerComponent,
    ],
    exports: [
        DashboardComponent,
        FormsComponent,
        MainBodyComponent
    ],
})

export class MainModule {

}
