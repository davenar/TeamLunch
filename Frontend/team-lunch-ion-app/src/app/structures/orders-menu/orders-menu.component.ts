import { OrderContract } from './../../contracts/order-contract';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-menu',
  templateUrl: './orders-menu.component.html',
  styleUrls: ['./orders-menu.component.scss'],
})
export class OrdersMenuComponent implements OnInit {

  @Input()
  list: OrderContract[];

  @Input()
  title: string;

  constructor() { }

  ngOnInit() {}

}
