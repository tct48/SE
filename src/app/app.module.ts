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
import { SigninComponent } from './signin/signin.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';

const otherModule = [
  ReactiveFormsModule,
  ChartModule,
  AngularEditorModule,
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
    ReportQuaterComponent,
    SigninComponent
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
  providers: [
    DatePipe,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
