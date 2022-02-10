import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '../users/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router, private accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const admin = this.accountService.userValue.isAdmin;
    if (admin) {
      // authorised so return true
      return true;
    }

    // not logged in as admin so redirect to login page with the return url
    alert('Sezione riservata agli admin!');
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
