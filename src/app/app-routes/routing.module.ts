import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../app-components/main-body/dashboard/dashboard.component';
import {AdminDashboardComponent} from '../app-components/main-body/admin-dashboard/admin-dashboard.component';
import {CustomerDashboardComponent} from '../app-components/main-body/customer-dashboard/customer-dashboard.component';
import {OwnerDashboardComponent} from '../app-components/main-body/owner-dashboard/owner-dashboard.component';
import {UnitManagerDashboardComponent} from '../app-components/main-body/unit-manager-dashboard/unit-manager-dashboard.component';
import {DriverDashboardComponent} from '../app-components/main-body/driver-dashboard/driver-dashboard.component';
import {FoodparkManagerDashboardComponent} from '../app-components/main-body/foodpark-manager-dashboard/foodpark-manager-dashboard.component';
import {HubManagerDashboardComponent} from '../app-components/main-body/hub-manager-dashboard/hub-manager-dashboard.component';
import {TerritoriesComponent} from '../app-components/main-body/territories/territories.component';
import {MainHubsComponent} from '../app-components/main-body/main-hubs/main-hubs.component';
import { AuthGuard } from '../app-services/auth.guard';

const routes: Routes = [
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: DashboardComponent, children: []
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
                path: 'new_main_hub_manager', component: HubManagerDashboardComponent, children: []
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
        path: 'hubmanager', component: HubManagerDashboardComponent, canActivate: [AuthGuard], children: []
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {
}
