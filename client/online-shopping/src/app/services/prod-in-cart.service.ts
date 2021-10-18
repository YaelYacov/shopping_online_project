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
  _prodInCartSearch: string = '';
  _bgSearchMatch: boolean = false;
  _fromOrders: boolean = false;
  strArr: Array<object> | any = [];
  _str: string = '';
  _namesArr: Array<object> | any = [];
  newName: string = '';
  _shit: boolean = false;
  key: string | any = '';
  _currentProdId: number = 0;

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

  _deleteProdInCart = (ProdInCartID: number, CartID: number) => {
    this._updateProdInCart(ProdInCartID, { Deleted: 0 }, CartID);
  };

  _returnName = (letter: string, i: number) => {
    let Names = this._prodInCart.map((prod) => prod.Product.Name);
    // console.log(Names, letter, i);
    for (let i = 0; i < Names.length; i++) {
      const element = Names[i];
    }
    return letter;
  };

  _nameStr = () => {
    // name: 'Bread';
    // word: isSearched: false;
    // letters: (5)[('B', 'r', 'e', 'a', 'd')];
    // console.log(this._namesArr);
    let element: string = '';
    for (let i = 0; i < this._namesArr.length; i++) {
      element = this._namesArr[i];
      console.log(element);
    }
    return element;
  };

  _changeItemBG = (event: any) => {
    this._shit = true;
    this._shit = this._prodInCartSearch == '' ? false : true;

    console.log(this._prodInCartSearch);

    // let Names = this._prodInCart.map((prod) => prod.Product.Name);
    let splitted = [...this._prodInCartSearch.split('')];
    console.log(splitted);
    // if (event.key == 'Backspace') {
    //   splitted.pop();
    // }
    this.strArr.map((item: { letter: string; isSearched: boolean }) => {
      for (let i = 0; i < splitted.length; i++) {
        console.log(splitted[i], item.letter);
        if (splitted[i].includes(item.letter)) {
          item.isSearched = true;
        }
        // item.isSearched = splitted[i].includes(item.letter) ? true : false;
      }
    });
    console.log(this.strArr);
  };
}

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
