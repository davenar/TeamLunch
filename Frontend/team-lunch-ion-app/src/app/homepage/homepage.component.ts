import { OrderService } from './../orders/order.service';
import { AdminService } from './../admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { DishContract } from '../contracts/dish-contract';
import { TodaysMenuContract } from '../contracts/todays-menu-contract';
import { Router } from '@angular/router';
import { OrderContract } from '../contracts/order-contract';
import { UserContract } from '../contracts/user-contract';
import { AccountService } from '../users/account.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  dishes: DishContract[];
  orders: OrderContract[];
  todaysmenus: TodaysMenuContract[];
  todaysmenu: TodaysMenuContract;
  todaysMenuId: number;
  todaysMenuDate: string;
  todaysMenuRestaurantName: string;
  user: UserContract;

  constructor(private service: AdminService, private orderSvc: OrderService, private router: Router, private accountSvc: AccountService) {
    this.accountSvc.user.subscribe(x => this.user = x);
   }

ionViewWillEnter(){
  this.fetchDishes();
  this.getLastTodaysMenu();
  this.fetchOrders();
}

fetchDishes() {
  this.service.fetchDishes().subscribe(
    (response) => {
      this.dishes = response;
    }
  );
}

getLastTodaysMenu() {
  this.service.fetchMenus().subscribe(
    (response) => {
      this.todaysmenu = response[0];
      console.log(this.todaysmenu.restaurantName);
      console.log('id:' + this.todaysmenu.id);
      // this.todaysMenuId = 1;
      this.todaysMenuDate = this.todaysmenu.date;
      this.todaysMenuRestaurantName = this.todaysmenu.restaurantName;
    }
  );
}

fetchOrders(){
  this.orderSvc.fetchOrders().subscribe(
    (response) => {
      this.orders = response;
    }
  );
}

create() {
  this.router.navigate(['orders/order-create']);
}

}
