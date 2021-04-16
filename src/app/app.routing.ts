import { RouterModule, Routes } from "@angular/router";
import { AppURL } from "./app.url";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrderComponent } from "./order/order.component";
import { ProductComponent } from "./product/product.component";
import { PromotionComponent } from "./promotion/promotion.component";
import { ReportQuaterComponent } from "./report-quater/report-quater.component";
import { ReportComponent } from "./report/report.component";

const RouterLists: Routes = [
    { path: '', redirectTo: AppURL.Dashboard, pathMatch: 'full' },
    { path: AppURL.Dashboard, component: DashboardComponent },
    { path: AppURL.Product, component: ProductComponent },
    { path: AppURL.Promotion, component: PromotionComponent },
    { path: AppURL.Order, component: OrderComponent },
    { path: AppURL.Report, component: ReportComponent },
    { path: AppURL.Quater, component:ReportQuaterComponent}
]

export const AppRouting = RouterModule.forRoot(RouterLists);