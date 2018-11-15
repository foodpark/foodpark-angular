import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './app-components/header/header.component';
import {FooterComponent} from './app-components/footer/footer.component';
import {LoaderComponent} from './app-components/loader/loader.component';
import {AppRoutingModule} from './app-routes/routing.module';
import {MainModule} from './app-modules/main.module';
import {ErrorInterceptor} from './error-interceptor';
import {ErrorComponent} from './error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MainModule,
        HttpClientModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
    bootstrap: [AppComponent],
    entryComponents: [ErrorComponent],
})
export class AppModule {
}
