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
  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public cartsService: CartsService,
    public prodInCartService: ProdInCartService,
    public categoriesService: CategoriesService,
    public ordersService: OrdersService
  ) {
    // this.categoriesService._categories;
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
    // console.log('login', this.usersServiceService._Users);
    // if (
    //   this.usersServiceService._Users &&
    //   this.usersServiceService._Users.length > 0
    // ) {
    //   console.log(this.usersServiceService._Users);
    //   console.log('sexx');
    //   // this.cartsService._getCartByID(1, this.usersServiceService._Users.ID, 0);

    //   // this.findCart();
    // }
  };

  findCart = () => {
    let CartID = this.usersServiceService._currentUser.CartID;
    if (CartID > 0) {
      console.log('sexxx');

      console.log(CartID);
      // console.log(this.prodInCartService._getProdInCartByCartID(CartID));
    } else
      this.cartsService._addNewCart(this.usersServiceService._currentUser.ID);
  };

  ngOnInit(): void {}
}
