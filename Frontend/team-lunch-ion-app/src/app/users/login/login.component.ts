import { ToastService } from './../../shared/services/toast.service';
import { AccountService } from './../account.service';
import { UserContract } from './../../contracts/user-contract';
import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('userName', {static: false}) ionInput: { setFocus: () => void};

  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isEnabled = true;
  isAdmin = false;
  user: UserContract;
  isLoggedIn = false;
  isRegistrationForm = false;

  constructor(private accountService: AccountService, private route: ActivatedRoute,
    private router: Router, private toastSvc: ToastService) { }

  ionViewWillEnter() {
    this.setFocusOnInput();
  }

  login() {
    this.accountService.login(this.username, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('loggato');
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
          this.toastSvc.presentToast('Login avvenuto correttamente!', 'success');
        },
        error: error => {
        }
      });
  }

  register() {
    this.accountService.register(this.firstName, this.lastName, this.username, this.isEnabled, this.isAdmin, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('registrato:' + this.user.firstName);
        },
        error: error => {
        }
      });
      // window.location.reload();
      this.toastSvc.presentToast('Registrazione avvenuta correttamente! Effettua il Login!', 'success');
      this.registerFormToggle();
  }

  registerFormToggle() {
    if (this.isRegistrationForm) {
      this.isRegistrationForm = false;
    } else {
      this.isRegistrationForm = true;
    }
  }

  setFocusOnInput() {
    this.ionInput.setFocus();
 }

}
