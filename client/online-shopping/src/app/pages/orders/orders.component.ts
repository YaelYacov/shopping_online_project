import { Component, OnInit } from '@angular/core';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(public prodInCartService: ProdInCartService) {}

  ngOnInit(): void {}
}
