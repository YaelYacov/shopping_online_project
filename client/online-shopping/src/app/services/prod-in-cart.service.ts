import { Injectable } from '@angular/core';
import { ProdInCart } from '../models/prodInCartModel';
import { Product } from '../models/productsModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProdInCartService {
  // _prodInCart: any;
  _prodInCart: Array<ProdInCart> = [];
  _totalPrice: number = 0;
  _prodInCartSearch: string = '';
  _fromOrders: boolean = false;
  strArr: Array<object> | any = [];
  _currentProdId: number = 0;

  constructor(public apiService: ApiService) {}

  _calcTotalPrice = () => {
    this._totalPrice = 0;
    this._prodInCart.map((prod) => {
      this._totalPrice += prod.Qnt * prod.Product.Price;
    });
  };

  _getProdInCartByCartID = async (CartID: number) => {
    if (CartID > 0) {
      this._prodInCart = (await this.apiService.createPostService(
        'prodInCart/getProdInCartByCartID',
        {
          CartID: CartID,
          // AllOrCartProds: 'All',
        }
      )) as Array<ProdInCart>;
      this._calcTotalPrice();
    }

    // console.log(this._prodInCart);
  };

  _addNewProdInCart = async (values: any) => {
    await this.apiService.createPostService('prodInCart/addNewProdInCart', {
      values: values,
    });
    this._getProdInCartByCartID(values.CartID);
  };

  _updateProdInCart = async (ID: number, values: object, CartID: number) => {
    await this.apiService.createPostService('prodInCart/updateProdInCart', {
      ID: ID,
      values: values,
    });
    this._getProdInCartByCartID(CartID);
  };

  _deleteProdInCart = (ProdInCartID: number, CartID: number) => {
    this._updateProdInCart(ProdInCartID, { Deleted: 0 }, CartID);
  };
}

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
