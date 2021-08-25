import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  startShopping: boolean = false;

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public cartsService: CartsService,
    public prodInCartService: ProdInCartService,
    public categoriesService: CategoriesService,
    public ordersService: OrdersService
  ) {
    // console.log(this.usersServiceService._getUser());
    // console.log(this.usersServiceService._updateUserCart());
    // console.log(this.usersServiceService._createNewUser());
    // console.log(this.productsService._addNewProd());
    // console.log(this.productsService._editProd());
    // console.log(this.productsService._getAllProducts());
    // console.log(this.cartsService._addNewCart());
    // console.log(this.cartsService._getCartByID());
    // console.log(this.cartsService._updateCartStatus());
    // console.log(this.prodInCartService._getProdInCartByCartID());
    // console.log(this.categoriesService._getAllCategories());
    // console.log(this.ordersService._getOrders());
    // console.log(this.ordersService._updateOrder());
    // console.log(this.ordersService._addNewOrder());
    // console.log(this.prodInCartService._getProdInCartByCartID());
    // console.log(this.prodInCartService._addNewProdInCart());
  }

  getUserNCart = () => {
    this.usersServiceService._getUser();
    this.startShopping = this.usersServiceService._User.ID > 0 ? false : true;
    console.log(this.usersServiceService._User.ID);
  };

  findCart = () => {
    let CartID = this.usersServiceService._Users.CartID;
    console.log(CartID);
    console.log(this.prodInCartService._getProdInCartByCartID(CartID));
    // let parsingUsers = JSON.parse(this.usersServiceService._Users);
    // let currentUserCart: number;
    // console.log(stringifyUsers);
    // let objectKeys = Object.values(this.usersServiceService._Users.find(user => user.CartID));
    // console.log(objectKeys);
    // this.usersServiceService._Users.CartID = currentUserCart ;
    // let currentUser = { ...this.usersServiceService._Users };
    // console.log(currentUser);
    // this.usersServiceService._Users.CartID == null
    //   ? console.log("there's no cart yet")
    //   : console.log('cartID is: ', this.usersServiceService._User.CartID);
  };

  ngOnInit(): void {}
}
