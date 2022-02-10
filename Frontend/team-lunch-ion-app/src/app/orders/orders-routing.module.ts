import { AuthGuard } from './../guards/auth.guard';
import { OrderCreateComponent } from './order-create/order-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersIndexComponent } from './orders-index/orders-index.component';

const routes: Routes = [
  {path: 'orders-list', component: OrdersIndexComponent, canActivate: [AuthGuard]},
  {path: 'order-create', component: OrderCreateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
