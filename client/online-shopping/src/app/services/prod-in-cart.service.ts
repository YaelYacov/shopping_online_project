import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProdInCartService {
  _prodInCart: any = [];
  constructor(public apiService: ApiService) {}

  _getProdInCartByCartID = async () => {
    this._prodInCart = await this.apiService.createPostService(
      'prodInCart/getProdInCartByCartID',
      {
        CartID: 1,
        // AllOrCartProds: 'All',
      }
    );
    console.log(this._prodInCart);
  };

  _addNewProdInCart = async () => {
    await this.apiService.createPostService('prodInCart/addNewProdInCart', {
      Qnt: 2,
      TotalPrice: 33,
      CartID: 2,
      ProductID: 2,
    });
    this._getProdInCartByCartID();
    // console.log(this._cart);
  };
}

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
