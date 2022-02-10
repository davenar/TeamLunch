import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { UserContract } from 'src/app/contracts/user-contract';
import { AccountService } from 'src/app/users/account.service';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.component.html',
  styleUrls: ['./settings-popover.component.scss'],
})
export class SettingsPopoverComponent implements OnInit {
  user: UserContract;

  constructor(private accountSvc: AccountService, private alertController: AlertController,
    private router: Router, private popoverController: PopoverController) {
    this.accountSvc.user.subscribe(x => this.user = x);
  }

  ngOnInit() { }

  logout() {
    this.accountSvc.logout();
    this.popoverController.dismiss();
  }

  async logoutAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      message: 'Ciao ' + this.accountSvc.userValue.firstName + ', vuoi davvero sloggare?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        },
      ]
    });
    await alert.present();
  }

  adminIndex() {
    this.router.navigate(['admin']);
    this.popoverController.dismiss();
  }

  userSettings() {
    this.router.navigate(['user-settings']);
    this.popoverController.dismiss();
  }

}
