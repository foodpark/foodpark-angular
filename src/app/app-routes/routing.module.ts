import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../app-components/main-body/business-container/dashboard/dashboard.component';
import {AdminDashboardComponent} from '../app-components/main-body/business-container/admin-dashboard/admin-dashboard.component';
import {CustomerDashboardComponent} from '../app-components/main-body/business-container/customer-dashboard/customer-dashboard.component';
import {OwnerDashboardComponent} from '../app-components/main-body/business-container/owner-dashboard/owner-dashboard.component';
import {UnitManagerDashboardComponent} from '../app-components/main-body/business-container/unit-manager-dashboard/unit-manager-dashboard.component';
import {DriverDashboardComponent} from '../app-components/main-body/business-container/driver-dashboard/driver-dashboard.component';
import {FoodparkManagerDashboardComponent} from '../app-components/main-body/business-container/foodpark-manager-dashboard/foodpark-manager-dashboard.component';
import {HubManagerDashboardComponent} from '../app-components/main-body/business-container/hub-manager-dashboard/hub-manager-dashboard.component';
import {TerritoriesComponent} from "../app-components/main-body/business-container/territories/territories.component";
import {MainHubsComponent} from "../app-components/main-body/business-container/main-hubs/main-hubs.component";

const routes: Routes = [
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: DashboardComponent, children: []
    },
    {
        path: 'admin', component: AdminDashboardComponent, children: [
            {
                path: 'territories', component: TerritoriesComponent, children: []
            },
            {
                path: 'mainhubs', component: MainHubsComponent, children: []
            },
            {
                path: 'hubmanager', component: HubManagerDashboardComponent, children: []
            }
        ]
    },
    {
        path: 'customer', component: CustomerDashboardComponent, children: []
    },
    {
        path: 'owner', component: OwnerDashboardComponent, children: []
    },
    {
        path: 'unitmanager', component: UnitManagerDashboardComponent, children: []
    },
    {
        path: 'driver', component: DriverDashboardComponent, children: []
    },
    {
        path: 'foodparkmanager', component: FoodparkManagerDashboardComponent, children: []
    }, {
        path: 'hubmanager', component: HubManagerDashboardComponent, children: []
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
