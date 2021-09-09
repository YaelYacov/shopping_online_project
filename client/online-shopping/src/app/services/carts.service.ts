import { Injectable } from '@angular/core';
import { Carts } from '../models/cartsModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  _cart: Array<Carts> = [];
  // _cart: any;

  constructor(public apiService: ApiService) {}

  _getCartByID = async (type?: number, ID?: number) => {
    let defType = type == 0 ? { ID: ID } : { userID: ID }; //type == 0 => cartID, type == 1 =userID
    let getCart = !ID ? { AllCarts: 'All' } : defType;
    this._cart = (await this.apiService.createPostService(
      'cart/getCartByID',
      getCart
    )) as Array<Carts>;

    console.log(this._cart);
  };

  _addNewCart = async () => {
    await this.apiService.createPostService('cart/addNewCart', {
      Status: 0,
    });
    this._getCartByID();
    console.log(this._cart);
  };

  _updateCartStatus = async () => {
    await this.apiService.createPostService('cart/updateCartStatus', {
      ID: 2,
      Status: 2,
    });
    this._getCartByID();
    console.log(this._cart);
  };
}
