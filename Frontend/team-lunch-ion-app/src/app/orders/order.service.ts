/* eslint-disable arrow-body-style */
import { OrderContract } from './../contracts/order-contract';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private client: HttpClient) { }

  fetchOrders = (): Observable<OrderContract[]> => {
    return this.client.get<OrderContract[]>(
      environment.api.localSwagger + 'Orders'
    );
  };

  createOrder(id: number, person: string, dish: string, quantity: number): Observable<OrderContract> {
    const request = {id, person, dish, quantity};
    return this.client.post<OrderContract>(
      environment.api.localSwagger + 'Orders',
      request
    );
  }

  updateOrder(id: number, person: string, dish: string, quantity: number): Observable<OrderContract> {
    const request = {id, person, dish, quantity};
    return this.client.put<OrderContract>(
      environment.api.localSwagger + 'Orders/' + id,
      request
    );
  }

  deleteOrder(id: number): Observable<OrderContract> {
    return this.client.delete<OrderContract>(
      environment.api.localSwagger + 'Orders/' + id
    );
  }
}
