import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { OrderComponent } from "../order/order.component";
import { ProductComponent } from "../product/product.component";
import { PromotionComponent } from "../promotion/promotion.component";
import { ReportQuaterComponent } from "../report-quater/report-quater.component";
import { ReportComponent } from "../report/report.component";
import { AuthURL } from "./authentication.url";

const RouterLists: Routes = [
    { path: '', redirectTo: AuthURL.Dashboard, pathMatch: 'full' },
    { path: AuthURL.Dashboard, component: DashboardComponent },
    { path: AuthURL.Product, component: ProductComponent },
    { path: AuthURL.Promotion, component: PromotionComponent },
    { path: AuthURL.Order, component: OrderComponent },
    { path: AuthURL.Report, component: ReportComponent },
    { path: AuthURL.Quater, component:ReportQuaterComponent}
]

export const AuthenticationRouting = RouterModule.forChild(RouterLists);