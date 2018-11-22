import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {TerritoriesComponent} from './territories/territories.component';
import {NewHubManagerComponent} from './NewHubManager/new-hub-manager.component';
import {AddAndEditTerritoryComponent} from './add-and-edit-territory/add-and-edit-territory.component';
import {MainHubComponent} from './main-hub/main-hub.component';
import {AddAndEditMainhubComponent} from './add-and-edit-mainhub/add-and-edit-mainhub.component';
import {RemoveSpacesPipe} from '../../../app-pipes/removeSpaces.pipe';
import {MainHubManagerModule} from '../main-hub-manager/main-hub-manager.module';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule,
        MainHubManagerModule
        // MatDatepickerModule,
        // MatNativeDateModule,
        // MatMomentDateModule
    ],
    declarations: [
        AdminDashboardComponent,
        TerritoriesComponent,
        NewHubManagerComponent,
        AddAndEditTerritoryComponent,
        MainHubComponent,
        AddAndEditMainhubComponent,
    ],
    exports: [
        AdminDashboardComponent,
        TerritoriesComponent,
        NewHubManagerComponent,
        AddAndEditTerritoryComponent,
        MainHubComponent,
        AddAndEditMainhubComponent,
    ],
})
export class AdminModule {

}
