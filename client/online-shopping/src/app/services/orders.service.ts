import { Injectable } from '@angular/core';
import { Orders } from '../models/ordersModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _orders: Array<Orders> = [];

  constructor(public apiService: ApiService) {}

  _getOrders = async (userID?: number) => {
    let getOrders = !userID ? { AllOrders: 'All' } : { userID: userID };
    this._orders = (await this.apiService.createPostService(
      'orders/getOrders',
      getOrders
    )) as Array<Orders>;
    console.log(this._orders);
  };

  _updateOrder = async () => {
    await this.apiService.createPostService('orders/updateOrder', {
      ID: 2,
      OrderInPlace: 1,
    });
    this._getOrders();
    console.log(this._orders);
  };

  _addNewOrder = async (reqBody: object) => {
    await this.apiService.createPostService(
      'orders/addNewOrder',
      //  {
      //   TotalPrice: 555,
      //   City: "Rosh Haa'ain",
      //   Street: 'Hachashmonaim',
      //   LastDigitsOfCard: '2546',
      //   userID: 2,
      // }
      reqBody
    );
    this._getOrders();
    console.log(this._orders);
  };
}

//create order only if client doesnt have an 'order in place  == 3' option
//orderss in place: 0 = new order 1 = active 2= closed order
