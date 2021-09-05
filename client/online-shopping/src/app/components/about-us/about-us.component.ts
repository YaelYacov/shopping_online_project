import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public cartsService: CartsService,
    public usersServiceService: UsersServiceService
  ) {
    this.ordersService._getOrders();
    this.productsService._getAllProducts();
    if (this.usersServiceService._User) {
      console.log(this.usersServiceService._User.CartID);
      this.cartsService._getCartByID(this.usersServiceService._User.CartID);
    }
  }

  ngOnInit(): void {}
}
