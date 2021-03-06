import { Injectable } from '@angular/core';
import { Carts } from '../models/cartsModel';
import { ApiService } from './api.service';
import { ProdInCartService } from './prod-in-cart.service';
import { UsersServiceService } from './users-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  _cart: Array<Carts> = [];
  _addCart: any;
  // _cart: any;

  constructor(
    public apiService: ApiService,
    public usersServiceService: UsersServiceService,
    public prodInCartService: ProdInCartService
  ) {}

  _getCartByID = async (type?: number, ID?: number) => {
    let defType = type == 0 ? { ID: ID } : { userID: ID }; //type == 0 => cartID, type == 1 =userID
    let getCart = !ID ? { AllCarts: 'All' } : defType;
    this._cart = (await this.apiService.createPostService(
      'cart/getCartByID',
      getCart
    )) as Array<Carts>;

    // console.log(this._cart);
  };

  _addNewCart = async (userID: number, type?: number) => {
    this._addCart = await this.apiService.createPostService('cart/addNewCart', {
      values: { userID: userID },
    });
    await this._getCartByID();
    await this.usersServiceService._getUser();
    await this.prodInCartService._getProdInCartByCartID(this._addCart.ID);
    type == 0
      ? ((this.usersServiceService._isOpenedCart = false),
        (this.usersServiceService._totP = 0))
      : null;
  };
}
