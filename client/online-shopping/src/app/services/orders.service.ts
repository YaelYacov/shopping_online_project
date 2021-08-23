import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _orders: any = [];

  constructor(public apiService: ApiService) {}

  _getOrders = async () => {
    this._orders = await this.apiService.createPostService('orders/getOrders', {
      // userID: 1,
      AllOrUserOrder: 'All',
    });
    console.log(this._orders);
  };

  _updateOrder = async () => {
    this._orders = await this.apiService.createPostService(
      'orders/updateOrder',
      {
        ID: 2,
        OrderInPlace: 1,
      }
    );
    this._getOrders();
    console.log(this._orders);
  };

  _addNewOrder = async () => {
    this._orders = await this.apiService.createPostService(
      'orders/addNewOrder',
      {
        TotalPrice: 555,
        City: "Rosh Haa'ain",
        Street: 'Hachashmonaim',
        LastDigitsOfCard: '2546',
        userID: 2,
      }
    );
    this._getOrders();
    console.log(this._orders);
  };
}
