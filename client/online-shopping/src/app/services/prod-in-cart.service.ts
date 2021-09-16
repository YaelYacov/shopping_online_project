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
  _singleProdInCart: ProdInCart = new ProdInCart();

  _totalPrice: number = 0;

  _qnt: number = 1;

  constructor(public apiService: ApiService) {}

  _getProdInCartByCartID = async (CartID: number) => {
    this._prodInCart = (await this.apiService.createPostService(
      'prodInCart/getProdInCartByCartID',
      {
        CartID: CartID,
        // AllOrCartProds: 'All',
      }
    )) as Array<ProdInCart>;
    this._calcTotalPrice();

    // console.log(this._prodInCart);
  };

  _addNewProdInCart = async (CartID: number, ProductID: number) => {
    await this.apiService.createPostService('prodInCart/addNewProdInCart', {
      values: {
        CartID: CartID,
        ProductID: ProductID,
      },
    });
    this._getProdInCartByCartID(CartID);
  };

  _updateProdInCart = async (ID: number, values: object, CartID: number) => {
    await this.apiService.createPostService('prodInCart/updateProdInCart', {
      ID: ID,
      values: values,
    });
    this._getProdInCartByCartID(CartID);
  };

  _calcTotalPrice = () => {
    this._totalPrice = 0;
    this._prodInCart.map((prod) => {
      this._totalPrice += prod.Qnt * prod.Product.Price;
    });
  };
}

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
