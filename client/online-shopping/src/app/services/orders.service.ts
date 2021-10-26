import { Injectable } from '@angular/core';
import { Orders } from '../models/ordersModel';
import { ApiService } from './api.service';
import { ProdInCartService } from './prod-in-cart.service';
import { UsersServiceService } from './users-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _orders: Array<Orders> = [];
  _order: Orders = new Orders();
  _isOrdering: boolean = false;
  downloadJsonHref: any;
  Rcp: string = '';

  constructor(
    public usersServiceService: UsersServiceService,
    public apiService: ApiService,
    public prodInCartService: ProdInCartService
  ) {}

  _getOrders = async (userID?: number) => {
    let getOrders = !userID ? { AllOrders: 'All' } : { userID: userID };
    this._orders = (await this.apiService.createPostService(
      'orders/getOrders',
      getOrders
    )) as Array<Orders>;
    // console.log(this._orders);
  };

  _updateOrder = async () => {
    await this.apiService.createPostService('orders/updateOrder', {
      ID: 2,
      OrderInPlace: 1,
    });
    this._getOrders();
    console.log(this._orders);
  };

  _isCreditCard = (str: string) => {
    //visa, american express, masterCard
    let visaAERMasterCRegexp =
      /^4[0-9]{12}(?:[0-9]{3})?$/ ||
      /^3[47][0-9]{13}$/ ||
      /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
    return visaAERMasterCRegexp.test(str) ? true : false;
  };

  rcp = () => {
    console.log(this.prodInCartService._prodInCart);
    this.Rcp += `total  price =  quantity  *  price   description   Product Name`;
    this.prodInCartService._prodInCart.map((prod: any) => {
      this.Rcp += `\n ${prod.Qnt * prod.Product.Price} = ${prod.Qnt} * ${
        prod.Product.Price
      } ${prod.Product.description} ${prod.Product.Name}`;
    });
    this.Rcp += `\n Total : ${this.prodInCartService._totalPrice}`;
    // return this.Rcp;
  };
  _addNewOrder = async (reqBody: object) => {
    if (this._isCreditCard(this._order.LastDigitsOfCard)) {
      this._order.userID = this.usersServiceService._Users.ID;
      this._order.TotalPrice = this.prodInCartService._totalPrice;
      await this.apiService.createPostService('orders/addNewOrder', reqBody);
      this._getOrders();
      this.prodInCartService._getProdInCartByCartID(
        this.usersServiceService._Users.ID
      );
      this.rcp();
    } else alert('Wrong Credit Card Number');

    console.log(this._orders);
  };
}

//create order only if client doesnt have an 'order in place  == 3' option
//orderss in place: 0 = new order 1 = active 2= closed order
