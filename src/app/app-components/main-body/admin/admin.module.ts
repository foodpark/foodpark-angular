import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {MainHubsListingComponent} from './main-hubs-listing/main-hubs-listing.component';
import {MainHubManagerModule} from '../main-hub-manager/main-hub-manager.module';
import {MainhubManagerListingComponent} from './mainhub-manager-listing/mainhub-manager-listing.component';
import {TerritoriesListingComponent} from './territories-listing/territories-listing.component';
import {AddEditMainHubManagerComponent} from './add-edit-main-hub-manager/add-edit-main-hub-manager.component';
import {AddEditTerritoryComponent} from './add-edit-territory/add-edit-territory.component';
import {AddEditMainhubComponent} from './add-edit-mainhub/add-edit-mainhub.component';
import {AdminReportingComponent} from './admin-reporting/admin-reporting.component';
import {AgmCoreModule} from '@agm/core';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        MainHubManagerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCte3xKzZwcbVXm7942WDn1Twu2I0SAsoo'
        })
    ],
    declarations: [
        AdminDashboardComponent,
        TerritoriesListingComponent,
        AddEditMainHubManagerComponent,
        AddEditTerritoryComponent,
        MainHubsListingComponent,
        AddEditMainhubComponent,
        MainhubManagerListingComponent,
        AdminReportingComponent
    ],
    exports: [],
})
export class AdminModule {

}
