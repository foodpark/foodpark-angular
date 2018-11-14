import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './app-components/header/header.component';
import {FooterComponent} from './app-components/footer/footer.component';
import {LoaderComponent} from './app-components/loader/loader.component';
import {AppRoutingModule} from './app-routes/routing.module';
import {MainModule} from './app-modules/main.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
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
