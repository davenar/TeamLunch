import { element } from 'protractor';
import { OrderContract, TotalOrdersContract } from './../../contracts/order-contract';
import { AdminService } from './../../admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodaysMenuContract } from 'src/app/contracts/todays-menu-contract';
import { OrderService } from '../order.service';
import * as lodash from 'lodash';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.scss'],
})
export class OrdersIndexComponent {
  orders: OrderContract[];
  totalOrders: TotalOrdersContract[];
  todaysmenu: TodaysMenuContract;
  todaysMenuId = 1;
  todaysMenuDate: string;
  todaysMenuRestaurantName: string;


  constructor(private service: OrderService, private router: Router, private adminSvc: AdminService) { }

  ionViewWillEnter() {
    this.service.fetchOrders().subscribe(
      (response) => {
        this.orders = lodash.orderBy(response, ['person'], ['asc']);
        this.getTotalOrders();
      }
    );
    this.getLastTodaysMenu();
  }

  create() {
    this.router.navigate(['orders/order-create']);
  }

  getLastTodaysMenu() {
    this.adminSvc.fetchMenus().subscribe(
      (response) => {
        this.todaysmenu = response[0];
        console.log(this.todaysmenu.restaurantName);
        console.log('id:' + this.todaysmenu.id);
        this.todaysMenuId = 1;
        this.todaysMenuDate = this.todaysmenu.date;
        this.todaysMenuRestaurantName = this.todaysmenu.restaurantName;
      }
    );
  }

  getTotalOrders() {
    this.totalOrders = lodash.orderBy(
      [
        ...this.orders.reduce((r, o) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          r.has(o.dish) || r.set(o.dish, Object.assign({ dish: o.dish, quantity: 0 }));
          const item = r.get(o.dish);
          item.quantity += o.quantity;
          return r;
        },
          new Map()).values()
      ],
      ['quantity'], ['desc']);
    console.log('totalOrders: ', this.totalOrders);
  }



}
