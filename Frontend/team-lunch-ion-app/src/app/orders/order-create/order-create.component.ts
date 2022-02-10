import { ToastService } from './../../shared/services/toast.service';
import { DishContract } from './../../contracts/dish-contract';
import { AdminService } from './../../admin/admin.service';
import { OrderContract } from './../../contracts/order-contract';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { AccountService } from 'src/app/users/account.service';
import { UserContract } from 'src/app/contracts/user-contract';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent {
  person: string;
  dish: string;
  quantity: number;
  dishes: DishContract[];
  user: UserContract;

  constructor(private router: Router, private service: OrderService, private adminSvc: AdminService, private accountSvc: AccountService,
     private toastSvc: ToastService) {
    this.accountSvc.user.subscribe(x => this.user = x);
   }

  ionViewWillEnter(){
    this.fetchDishes();
    this.quantity = 1;
    this.person = (this.user.firstName + ' ' + this.user.lastName);
  }

  createOrder = () => {
    this.service.createOrder(0, this.person, this.dish, this.quantity).subscribe((r: OrderContract) => {
      console.log(this.person);
      this.toastSvc.presentToast('Ordine inserito correttamente!', 'primary');
      this.router.navigate(['orders/orders-list']);
    });
  };

  fetchDishes() {
    this.adminSvc.fetchDishes().subscribe(
      (response) => {
        this.dishes = response;
      }
    );
  }

  goBack() {
    this.router.navigate(['orders/orders-list']);
  }

}
