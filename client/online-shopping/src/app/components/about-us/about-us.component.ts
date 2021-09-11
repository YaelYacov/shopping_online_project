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
  notNewUser: Boolean = true;
  // currentCartOb: Array<Carts> = [];
  currentCartOb: any;

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public cartsService: CartsService,
    public usersServiceService: UsersServiceService
  ) {
    this.ordersService._getOrders();
    this.productsService._getAllProducts();
    if (this.usersServiceService._Users) {
      // console.log(this.usersServiceService._Users.CartID);
      if (this.usersServiceService._Users.CartID != null) {
        // this.cartsService._getCartByID(
        //   0,
        //   this.usersServiceService._Users.CartID
        // );
        this.cartsService._getCartByID(
          1,
          this.usersServiceService._currentUserID
        ); //gettin all carts that belongs to user
        this.notNewUser = this.cartsService._cart.length > 1 ? false : true;
        if (this.cartsService._cart.length > 0) {
          // let status = this.findCurrentCart(
          //   this.usersServiceService._Users.CartID
          // );
        }
      }
    }
    // this.userCartStatus();
  }

  ngOnInit(): void {}

  findCurrentCart = (CartID: number) => {
    console.log(this.cartsService._cart);
    this.currentCartOb = this.cartsService._cart.find(
      (cart) => cart.ID == CartID
    );
    this.notNewUser = true;
    console.log(this.currentCartOb);
    return this.currentCartOb.createdAt.slice(0, 10);
  };

  userCartStatus = () => {
    this.cartsService._getCartByID();
  };
}
