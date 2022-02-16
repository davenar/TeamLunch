import { ToastService } from './../../shared/services/toast.service';
import { UserContract } from 'src/app/contracts/user-contract';
import { OrderContract, TotalOrdersContract } from './../../contracts/order-contract';
import { OrderService } from './../../orders/order.service';
import { DishContract } from './../../contracts/dish-contract';
import { TodaysMenuContract } from './../../contracts/todays-menu-contract';
import { AdminService } from './../admin.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/users/account.service';
import { first } from 'rxjs/operators';
import * as lodash from 'lodash';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss'],
})
export class AdminIndexComponent {

  isRendering = false;

  // Gestione Utenti
  users: UserContract[];
  user: UserContract;
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isEnabled: boolean;
  isAdmin: boolean;

  // Gestione Menu del Giorno
  todaysMenuId: number;
  todaysMenuDate: string;
  todaysMenuRestaurantName: string;
  todaysmenus: TodaysMenuContract[];
  todaysmenu: TodaysMenuContract;
  isMenuIn = false;

  // Gestione Piatti
  dishId: number;
  dishName: string;
  dishImg: string;
  dishIngredients: string;
  dishes: DishContract[];
  dish: DishContract;

  // Gestione Ordini
  orders: OrderContract[];
  orderId: number;
  orderPerson: string;
  orderDish: string;
  orderQuantity: number;
  totalOrders: TotalOrdersContract[];

  constructor(private service: AdminService, private alertController: AlertController, private orderSvc: OrderService,
    private router: Router, private accountSvc: AccountService, private toastSvc: ToastService) {
    this.accountSvc.user.subscribe(x => this.user = x);
  }

  ionViewWillEnter() {
    this.isRendering = true;
    this.fetchUsers();
    this.getLastTodaysMenu();
    this.fetchDishes();
    this.fetchOrders();
  }

  // #region Gestione Utenti
  fetchUsers() {
    this.accountSvc.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  deleteUser(userToDelete: number) {
    this.userId = userToDelete;
    this.accountSvc.delete(this.userId).subscribe(
      (response) => {
        this.fetchUsers();
      }
    );
  }

  updateUser(userId: number, firstName: string, lastName: string, username: string, password: string,
    isEnabled: boolean, isAdmin: boolean) {
    this.userId = userId;
    const params = {
      firstName, lastName, username, password, isEnabled, isAdmin
    };
    this.accountSvc.update(this.userId, params).subscribe(
      (r) => {
        this.fetchUsers();
      }
    );
  }
  // #endregion

  // #region Gestione Menu del Giorno
  getLastTodaysMenu() {
    this.service.fetchMenus().subscribe(
      (response) => {
        console.log('response: ' + response);
        if (response.length > 0) {
          this.isMenuIn = true;
        } else {
          this.isMenuIn = false;
        }
        console.log('esiste un menu: ' + this.isMenuIn);
        this.todaysmenu = response[0];
        console.log(this.todaysmenu.restaurantName);
        console.log('id:' + this.todaysmenu.id);
        this.todaysMenuId = this.todaysmenu.id;
        this.todaysMenuDate = this.todaysmenu.date;
        this.todaysMenuRestaurantName = this.todaysmenu.restaurantName;
      }
    );
  }

  updateTodaysMenu = () => {
    this.service.updateTodaysMenu(this.todaysMenuId, this.todaysMenuDate, this.todaysMenuRestaurantName).subscribe(
      (r: TodaysMenuContract) => {
        this.getLastTodaysMenu();
        this.toastSvc.presentToast(
          'Team Lunch del ' + this.todaysMenuDate + ' da ' + this.todaysMenuRestaurantName + ' settato correttamente.', 'success');
      });
  };

  createTodaysMenu = () => {
    this.service.createTodayMenu(0, this.todaysMenuDate, this.todaysMenuRestaurantName).subscribe(
      (r: TodaysMenuContract) => {
        this.getLastTodaysMenu();
      });
  };


  async setTeamLunch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Set Team Lunch',
      message: 'Vuoi settare il prossimo Team Lunch del ' + this.todaysMenuDate + ' presso: ' + this.todaysMenuRestaurantName,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sì',
          handler: () => {
            // this.updateTodaysMenu();
            this.updateMenuRequest();
          }
        },
        // {
        //   text: 'Crea (dev)',
        //   handler: () => {
        //     this.createTodaysMenu();
        //   }
        // }
      ]
    });
    await alert.present();
  }

  async deleteTeamLunch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Team Lunch',
      message: 'Vuoi cancellare il prossimo Team Lunch e tutti gli ordini associati?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sì',
          handler: () => {
            this.deleteMenu();
            this.deleteAllOrders();
          }
        },
      ]
    });
    await alert.present();
  }

  updateMenuRequest() {
    if (this.isMenuIn) {
      this.updateTodaysMenu();
    } if (!this.isMenuIn) {
      this.createTodaysMenu();
    }
  }

  deleteMenu() {
    this.service.deleteTodaysMenu(this.todaysMenuId).subscribe(
      (response) => {
        this.getLastTodaysMenu();
        this.router.navigate(['/']);
      }
    );
  }

  // #endregion

  // #region Gestione Piatti
  fetchDishes() {
    this.service.fetchDishes().subscribe(
      (response) => {
        this.dishes = response;
      }
    );
  }

  updateDish(dishIdToUpdate: number, dishNameToUpdate: string) {
    console.log(dishIdToUpdate);
    this.dishId = dishIdToUpdate;
    this.dishName = dishNameToUpdate;
    console.log(this.dishId);
    this.service.updateDish(this.dishId, this.dishName, this.dishImg, this.dishIngredients).subscribe(
      (r) => {
        this.dishName = '';
        this.fetchDishes();
      }
    );
  }

  createDish = () => {
    this.service.createDish(0, this.dishName, this.dishImg, this.dishIngredients).subscribe(
      (r: DishContract) => {
        this.fetchDishes();
        this.dishName = '';
      });
  };

  deleteDish(dishToDelete: number) {
    console.log(dishToDelete);
    this.dishId = dishToDelete;
    console.log(this.dishId);
    this.service.deleteDish(this.dishId).subscribe(
      (response) => {
        this.fetchDishes();
      }
    );
  }

  getDish() {
    this.service
      .getDish(this.dishId)
      .subscribe((data: DishContract) => {
        this.dish = data;
        this.dishId = data.id;
      });
  }
  // #endregion

  // #region Gestione Ordini
  fetchOrders() {
    this.orderSvc.fetchOrders().subscribe(
      (response) => {
        this.orders = response;
        this.getTotalOrders();
      }
    );
  }

  updateOrder(orderIdToUpdate: number, orderPersonToUpdate: string, orderDishToUpdate: string, orderQuantityToUpdate: number) {
    this.orderId = orderIdToUpdate;
    this.orderPerson = orderPersonToUpdate;
    this.orderDish = orderDishToUpdate;
    this.orderQuantity = orderQuantityToUpdate;
    this.orderSvc.updateOrder(this.orderId, this.orderPerson, this.orderDish, this.orderQuantity).subscribe(
      (r) => {
        this.fetchOrders();
      }
    );
  }

  deleteOrder(orderToDelete: number) {
    this.orderId = orderToDelete;
    this.orderSvc.deleteOrder(this.orderId).subscribe(
      (response) => {
        this.fetchOrders();
      }
    );
  }

  deleteAllOrders() {
    this.orders.forEach(order => {
      this.orderSvc.deleteOrder(order.id).subscribe(
        (response) => {
          console.log('ordine n.' + order.id + ' eliminato');
        }
      );
    });
    this.fetchOrders();
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
  // #endregion

  goBack() {
    this.router.navigate(['/home']);
  }

}
