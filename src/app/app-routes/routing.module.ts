import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../app-components/main-body/business-container/dashboard/dashboard.component';
import {AdminDashboardComponent} from '../app-components/main-body/business-container/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: DashboardComponent, children: []
    },
    {
        path: 'adminlogin', component: AdminDashboardComponent, children: []
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
