import { Component, OnInit } from '@angular/core';
import { Carts } from 'src/app/models/cartsModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  // currentCartOb: Array<Carts> = [];
  currentCartOb: any;

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public cartsService: CartsService,
    public usersServiceService: UsersServiceService,
    public prodInCartService: ProdInCartService
  ) {
    this.ordersService._getOrders();
  }

  ngOnInit(): void {}
}
