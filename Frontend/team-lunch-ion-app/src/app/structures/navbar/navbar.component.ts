import { SettingsPopoverComponent } from './../settings-popover/settings-popover.component';
import { UserContract } from './../../contracts/user-contract';
import { AccountService } from './../../users/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: UserContract;

  constructor(private router: Router, private accountSvc: AccountService, private popoverController: PopoverController) {
    this.accountSvc.user.subscribe(x => this.user = x);
   }

home(){
  this.router.navigate(['/home']);
}

ordersList(){
  this.router.navigate(['orders/orders-list']);
}

userSettings() {
  this.router.navigate(['user-settings']);
  this.popoverController.dismiss();
}

async settingsPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: SettingsPopoverComponent,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

goToLogin(){
  this.router.navigate(['/login']);
}




}
