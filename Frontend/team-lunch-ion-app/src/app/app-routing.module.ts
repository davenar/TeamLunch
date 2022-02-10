import { UserSettingsComponent } from './users/user-settings/user-settings.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './users/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';

const routes: Routes = [
    {path: 'home', component: HomepageComponent},
    {path: 'admin', component: AdminIndexComponent, canActivate: [AdminGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'user-settings', component: UserSettingsComponent},
    {path: 'orders', loadChildren:() => import('./orders/orders.module').then(m => m.OrdersModule)},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    // {path:'**', component: NotfoundComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
