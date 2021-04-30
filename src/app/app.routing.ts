import { RouterModule, Routes } from "@angular/router";
import { AppURL } from "./app.url";
import { AuthenticationModule } from "./authentication/authentication.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthenticationGuard } from "./guard/authentication.guard";
import { MemberComponent } from "./member/member.component";
import { OrderComponent } from "./order/order.component";
import { ProductComponent } from "./product/product.component";
import { PromotionComponent } from "./promotion/promotion.component";
import { ReportQuaterComponent } from "./report-quater/report-quater.component";
import { ReportComponent } from "./report/report.component";
import { SigninComponent } from "./signin/signin.component";
import { SuppliesPrintComponent } from "./supplies-print/supplies-print.component";

const RouterLists: Routes = [
    { path: '', redirectTo: AppURL.Signin, pathMatch: 'full' },
    { path: AppURL.Dashboard, component: DashboardComponent, canActivate:[AuthenticationGuard] },
    { path: AppURL.Product, component: ProductComponent, canActivate:[AuthenticationGuard] },
    { path: AppURL.Promotion, component: PromotionComponent, canActivate:[AuthenticationGuard] },
    { path: AppURL.Order, component: OrderComponent, canActivate:[AuthenticationGuard] },
    { path: AppURL.Report, component: ReportComponent, canActivate:[AuthenticationGuard] },
    { path: AppURL.Quater, component:ReportQuaterComponent, canActivate:[AuthenticationGuard]},
    { path: AppURL.Supplies, component:SuppliesPrintComponent },
    { path: AppURL.Signin, component:SigninComponent},
    { path:AppURL.Member,component:MemberComponent, canActivate:[AuthenticationGuard] }
    // { path:AppURL.Authentication,loadChildren:()=>AuthenticationModule,canActivate:[Authenticationg] }

]

export const AppRouting = RouterModule.forRoot(RouterLists);