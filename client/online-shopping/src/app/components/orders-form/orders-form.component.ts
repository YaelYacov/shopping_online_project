import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css'],
})
export class OrdersFormComponent implements OnInit {
  constructor(public ordersService: OrdersService) {}
  // `ID`, `TotalPrice`, `City`, `Street`, `OrderInPlace`, `LastDigitsOfCard`, `createdAt`, `updatedAt`, `userID

  ngOnInit(): void {}
}
