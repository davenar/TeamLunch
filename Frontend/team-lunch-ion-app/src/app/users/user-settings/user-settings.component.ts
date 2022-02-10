import { AlertController } from '@ionic/angular';
import { ToastService } from './../../shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { UserContract } from 'src/app/contracts/user-contract';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  user: UserContract;

  constructor(private accountSvc: AccountService, private toastSvc: ToastService,
    private alertController: AlertController) {
    this.accountSvc.user.subscribe(x => this.user = x);
  }

  ionViewWillEnter(){
  }

  deleteUser(){
    this.accountSvc.delete(this.user.id).subscribe(
      (response) => {
        this.toastSvc.presentToast('Utente eliminato correttamente','primary');
      }
    );
  }

  async deleteUserRequest() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Elimina Utente',
      message: 'Ciao ' + this.user.firstName + ', vuoi davvero eliminare questo utente?',
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
            this.deleteUser();
          }
        },
      ]
    });
    await alert.present();
  }

  async updateUserRequest() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aggiorna Utente',
      message: 'Ciao ' + this.user.firstName + ', vuoi davvero aggiornare il tuo profilo utente con queste modifiche?',
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
            this.updateUser();
          }
        },
      ]
    });
    await alert.present();
  }

  updateUser() {
    const params = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      password: this.user.password,
      isEnabled: this.user.isEnabled,
      isAdmin: this.user.isAdmin
    };
    this.accountSvc.update(this.user.id, params).subscribe(
      (r) => {
        this.toastSvc.presentToast('Utente aggiornato correttamente','primary');
      }
    );
  }



}
