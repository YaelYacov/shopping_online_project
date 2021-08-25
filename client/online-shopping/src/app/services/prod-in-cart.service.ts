import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProdInCartService {
  _prodInCart: any = [];
  constructor(public apiService: ApiService) {}

  _getProdInCartByCartID = async (CartID: number) => {
    this._prodInCart = await this.apiService.createPostService(
      'prodInCart/getProdInCartByCartID',
      {
        CartID: CartID,
        // AllOrCartProds: 'All',
      }
    );
    console.log(this._prodInCart);
  };

  _addNewProdInCart = async (CartID: number) => {
    await this.apiService.createPostService('prodInCart/addNewProdInCart', {
      Qnt: 2,
      TotalPrice: 33,
      CartID: CartID,
      ProductID: 2,
    });
    this._getProdInCartByCartID(CartID);
    // console.log(this._cart);
  };
}

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
