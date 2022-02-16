import { DishContract } from './../contracts/dish-contract';
/* eslint-disable arrow-body-style */
import { TodaysMenuContract } from './../contracts/todays-menu-contract';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }

  fetchMenus = (): Observable<TodaysMenuContract[]> => {
    return this.client.get<TodaysMenuContract[]>(
      environment.api.baseApiUrl + 'TodaysMenus/FetchAllTodaysMenus'
    );
  };

  createTodayMenu(id: number, date: string, restaurantName: string): Observable<TodaysMenuContract> {
    const request = {id, date, restaurantName};
    return this.client.post<TodaysMenuContract>(
      environment.api.baseApiUrl + 'TodaysMenus/CreateTodaysMenu',
      request
    );
  }

  getTodaysMenu(id: number): Observable<TodaysMenuContract> {
    const request = { id };
    return this.client.post<TodaysMenuContract>(
      environment.api.baseApiUrl + 'TodaysMenus/GetTodaysMenu/' + request,
      request
    );
  }

  updateTodaysMenu(id: number, date: string, restaurantName: string): Observable<TodaysMenuContract> {
    const request = {id, date, restaurantName};
    return this.client.put<TodaysMenuContract>(
      environment.api.baseApiUrl + 'TodaysMenus/UpdateTodaysMenu/' + id,
      request
    );
  }

  deleteTodaysMenu(id: number): Observable<TodaysMenuContract> {
    return this.client.delete<TodaysMenuContract>(
      environment.api.baseApiUrl + 'TodaysMenus/DeleteTodaysMenu/' + id
    );
  }

  fetchDishes = (): Observable<DishContract[]> => {
    return this.client.get<DishContract[]>(
      environment.api.baseApiUrl + 'Dishes/FetchAllDishes'
    );
  };

  createDish(id: number, dishName: string, dishImg: string, ingredients: string): Observable<DishContract> {
    const request = {id, dishName, dishImg, ingredients};
    return this.client.post<DishContract>(
      environment.api.baseApiUrl + 'Dishes/CreateDish',
      request
    );
  }

  getDish(id: number): Observable<DishContract> {
    const request = { id };
    return this.client.post<DishContract>(
      environment.api.baseApiUrl + 'Dishes/GetDish/' + request,
      request
    );
  }

  updateDish(id: number, dishName: string, dishImg: string, ingredients: string): Observable<DishContract> {
    const request = {id, dishName, dishImg, ingredients};
    return this.client.put<DishContract>(
      environment.api.baseApiUrl + 'Dishes/UpdateDish/' + id,
      request
    );
  }

  deleteDish(id: number): Observable<DishContract> {
    return this.client.delete<DishContract>(
      environment.api.baseApiUrl + 'Dishes/DeleteDish/' + id
    );
  }
}
