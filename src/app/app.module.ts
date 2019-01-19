import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import {HeaderComponent} from './app-components/header/header.component';
import {FooterComponent} from './app-components/footer/footer.component';
import {LoaderComponent} from './app-components/loader/loader.component';
import {AppRoutingModule} from './app-routes/routing.module';
import {ErrorInterceptor} from './error-interceptor';
import {ErrorComponent} from './error/error.component';
import {AuthInterceptor} from './auth-interceptor';
import {LoginComponent} from './app-components/main-body/login/login.component';
import {GuestCreatePodsComponent} from './app-components/main-body/guest-create-pods/create-pods.component';
import {AdminModule} from './app-components/main-body/admin/admin.module';
import {MainHubManagerModule} from './app-components/main-body/main-hub-manager/main-hub-manager.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

import {PodManagerModule} from './app-components/main-body/pod-manager-dashboard/pod-manager.module';
import { TitleCasePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        ErrorComponent,
        LoginComponent,
        GuestCreatePodsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AdminModule,
        MainHubManagerModule,
        PodManagerModule,
        ToastrModule.forRoot()
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        TitleCasePipe
    ],
    bootstrap: [AppComponent],
    entryComponents: [ErrorComponent],
})
export class AppModule {
}
