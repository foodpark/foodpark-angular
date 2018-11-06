import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './app-components/header/header.component';
import {FooterComponent} from './app-components/footer/footer.component';
import {LoaderComponent} from './app-components/loader/loader.component';
import {AppRoutingModule} from './app-routes/routing.module';
import {MainModule} from './app-modules/main.module';
import {HttpClientModule} from '@angular/common/http';
import {TerritoriesComponent} from './app-components/main-body/business-container/territories/territories.component';
import {MainHubsComponent} from './app-components/main-body/business-container/main-hubs/main-hubs.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        TerritoriesComponent,
        MainHubsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MainModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
