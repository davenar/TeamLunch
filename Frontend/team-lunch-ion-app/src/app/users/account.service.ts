import { UserContract } from './../contracts/user-contract';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

//REPLACE environment.api.auth WITH environment.api.localswagger FOR NEW APIs

export class AccountService {
  public user: Observable<UserContract>;
  private userSubject: BehaviorSubject<UserContract>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<UserContract>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserContract {
    return this.userSubject.value;
  }

  login(username, password) {
    return this.http.post<UserContract>(`${environment.api.auth}Users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // register(user: UserContract) {
  //   return this.http.post(`${environment.api.auth}Users/register`, user);
  // }

  register(firstName: string, lastName: string, username: string, isEnabled: boolean,
     isAdmin: boolean, password: string): Observable<UserContract> {
    const request = {firstName, lastName, username, isEnabled, isAdmin, password};
    return this.http.post<UserContract>(
      environment.api.auth + 'Users/register',
      request
    );
  }

  getAll() {
    return this.http.get<UserContract[]>(`${environment.api.auth}Users`);
  }

  getById(id: number) {
    return this.http.get<UserContract>(`${environment.api.auth}Users/${id}`);
  }

  update(id, params) {
    return this.http.put(`${environment.api.auth}Users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id === this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${environment.api.auth}Users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id === this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }
}
