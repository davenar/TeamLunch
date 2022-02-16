import { OrdersMenuComponent } from './../structures/orders-menu/orders-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    OrdersMenuComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    OrdersMenuComponent
  ],
  providers: [

  ]
})
export class SharedModule { }
