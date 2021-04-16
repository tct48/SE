import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from 'src/app/app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthNavBarComponent } from './share/auth-nav-bar/auth-nav-bar.component';
import { AuthContentComponent } from './share/auth-content/auth-content.component';
import { ProductComponent } from './product/product.component';
import { PromotionComponent } from './promotion/promotion.component';
import { OrderComponent } from './order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Valor Software Component
import { ChartModule } from 'angular2-chartjs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportComponent } from './report/report.component';
import { ReportQuaterComponent } from './report-quater/report-quater.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
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
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthNavBarComponent,
    AuthContentComponent,
    ProductComponent,
    PromotionComponent,
    OrderComponent,
    ReportComponent,
    ReportQuaterComponent
  ],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
