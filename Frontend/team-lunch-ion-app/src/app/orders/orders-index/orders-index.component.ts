import { OrderContract } from './../../contracts/order-contract';
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
  totalOrders: [] = [];
  todaysmenu: TodaysMenuContract;
  todaysMenuId = 1;
  todaysMenuDate: string;
  todaysMenuRestaurantName: string;


  constructor(private service: OrderService, private router: Router, private adminSvc: AdminService) { }

  ionViewWillEnter(){
    this.service.fetchOrders().subscribe(
      (response) => {
        //this.orders = response;
        this.orders = lodash.orderBy(response, ['dish'], ['asc']);
        //this.totalOrders = lodash.countBy(response, (x: OrderContract) => x.dish);
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

  getTotalOrders(){
    const totalOrders = [...new Set(this.orders.map((item)=> item.dish))];

    console.log(totalOrders);
  }


}
