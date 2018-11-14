import {NgModule} from '@angular/core';
import {DropdownComponent} from "./dropdown.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule, FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
        DropdownComponent
    ],
    exports: [
        DropdownComponent
    ],
})
export class DropdownModule {

}
