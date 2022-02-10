import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      color: toastColor,
      duration: 2000
    });
    toast.present();
  }

}
