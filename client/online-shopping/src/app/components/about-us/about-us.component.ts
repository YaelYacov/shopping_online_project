import { Component, OnInit } from '@angular/core';
import { Carts } from 'src/app/models/cartsModel';
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
  // currentCartOb: Array<Carts> = [];
  currentCartOb: any;

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public cartsService: CartsService,
    public usersServiceService: UsersServiceService
  ) {
    // this.ordersService._getOrders();
    // this.productsService._getAllProducts();
    // if (this.usersServiceService._Users) {
    //   console.log(this.usersServiceService._Users);
    // }
  }

  ngOnInit(): void {}

  ifUsers = () => {
    if (this.usersServiceService._Users) {
      console.log(this.usersServiceService._Users.Carts);
      return this.usersServiceService._Users.Carts.find(
        (cart: any) => cart.Status == 0
      ).createdAt.slice(0, 10);
      // this.cartsService._getCartByID(1, this.usersServiceService._Users.ID, 0); //gettin all carts that belongs to user and cart status = 0
    }
  };
}
