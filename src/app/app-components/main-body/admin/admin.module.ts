import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {MainHubManagerModule} from '../main-hub-manager/main-hub-manager.module';
import {AdminReportingComponent} from './admin-reporting/admin-reporting.component';
import {AgmCoreModule} from '@agm/core';
import {TreeModule} from 'ng2-tree';
import {TerritoriesListingComponent} from './territories/territories-listing/territories-listing.component';
import {AddEditMainHubManagerComponent} from './mainhubmanager/add-edit-main-hub-manager/add-edit-main-hub-manager.component';
import {AddEditTerritoryComponent} from './territories/add-edit-territory/add-edit-territory.component';
import {MainHubsListingComponent} from './mainhubs/main-hubs-listing/main-hubs-listing.component';
import {AddEditMainhubComponent} from './mainhubs/add-edit-mainhub/add-edit-mainhub.component';
import {MainhubManagerListingComponent} from './mainhubmanager/mainhub-manager-listing/mainhub-manager-listing.component';
import {AdminReportingGraphsComponent} from './admin-reporting-graphs/admin-reporting-graphs.component';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: 'abcdefgh'
        }),
        TreeModule,
        GoogleChartsModule
    ],
    declarations: [
        AdminDashboardComponent,
        TerritoriesListingComponent,
        AddEditMainHubManagerComponent,
        AddEditTerritoryComponent,
        MainHubsListingComponent,
        AddEditMainhubComponent,
        MainhubManagerListingComponent,
        AdminReportingComponent,
        AdminReportingGraphsComponent
    ],
    exports: [],
})
export class AdminModule {

}
