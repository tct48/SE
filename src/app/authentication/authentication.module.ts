import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AppRoutingModule } from "../app-routing.module";
import { AppComponent } from "../app.component";
import { AppRouting } from "../app.routing";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { OrderComponent } from "../order/order.component";
import { ProductComponent } from "../product/product.component";
import { PromotionComponent } from "../promotion/promotion.component";
import { ReportQuaterComponent } from "../report-quater/report-quater.component";
import { ReportComponent } from "../report/report.component";
import { AuthContentComponent } from "../share/auth-content/auth-content.component";
import { AuthNavBarComponent } from "../share/auth-nav-bar/auth-nav-bar.component";
import { AuthenticationRouting } from "./authentication.routing";

// Valor Software Component
import { ChartModule } from 'angular2-chartjs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const otherModule = [
    ReactiveFormsModule,
    ChartModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
  

@NgModule({
    declarations:[
        // AppComponent,
        // DashboardComponent,
        // AuthNavBarComponent,
        // AuthContentComponent,
        // ProductComponent,
        // PromotionComponent,
        // OrderComponent,
        // ReportComponent,
        // ReportQuaterComponent
    ],
    imports:[
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        AppRouting,
        otherModule,
    ],
    exports: [
      otherModule
    ]
})

export class AuthenticationModule{}