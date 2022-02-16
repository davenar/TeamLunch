import { OrdersMenuComponent } from './../structures/orders-menu/orders-menu.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from './../app.module';
import { OrdersIndexComponent } from './orders-index/orders-index.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrdersIndexComponent,
    OrderCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    IonicModule,
    FormsModule,
    ]
})
export class OrdersModule { }
