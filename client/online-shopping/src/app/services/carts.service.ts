import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  _cart: any = [];
  constructor(public apiService: ApiService) {}

  _addNewCart = async () => {
    this._cart = await this.apiService.createPostService('cart/addNewCart', {
      Status: 0,
    });
    console.log(this._cart);
  };

  _getCartByID = async () => {
    this._cart = await this.apiService.createPostService('cart/getCartByID', {
      ID: 2,
    });
    console.log(this._cart);
  };

  _updateCartStatus = async () => {
    this._cart = await this.apiService.createPostService(
      'cart/updateCartStatus',
      {
        ID: 2,
        Status: 2,
      }
    );
    console.log(this._cart);
  };
}
