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
  key: string | any = '';
  _currentProdId: number = 0;
  _moreThanOne: boolean = false;

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

  _isLettInStrMulti = (searchStr: string, prodName: string) => {
    let idxOfFstLett: number = 0;
    let IdxOfSecLett: number = 0;
    let IdxOfFstLettSearch: number = 0;
    let IdxOfSecLettSearch: number = 0;
    let filterLettInName: Array<string> = [];
    let filterLettInSearch: Array<string> = [];

    let splittedSearch = [...searchStr.split('')];
    // let splittedName = [{letter: prod}];
    let nameNIdxArr: Array<any> = [];
    for (let j = 0; j < prodName.length; j++) {
      let ob = { letter: prodName[j], idx: j };
      nameNIdxArr.push(ob);
    }
    for (let i = 0; i < searchStr.length; i++) {
      // let currOb = {letter}

      idxOfFstLett = prodName.indexOf(searchStr[i]);
      IdxOfSecLett = prodName.indexOf(searchStr[i], idxOfFstLett + 1);
      // console.log(IdxOfSecLett, idxOfFstLett);
      IdxOfFstLettSearch = searchStr.indexOf(searchStr[i]);
      IdxOfSecLettSearch = searchStr.indexOf(
        searchStr[i],
        IdxOfFstLettSearch + 1
      );
      ////
      filterLettInSearch = splittedSearch.filter(
        (letter: string) => letter == searchStr[i] && IdxOfSecLettSearch > -1
      );
      // console.log(IdxOfFstLettSearch, IdxOfSecLettSearch, filterLettInSearch);
      if (idxOfFstLett > -1 && IdxOfSecLett == -1) this._moreThanOne = false;
      else if (idxOfFstLett > -1 && IdxOfSecLett > -1) {
        this._moreThanOne = true;
        filterLettInName = nameNIdxArr.filter(
          (item: { letter: string; idx: number }) =>
            item.letter == searchStr[i] && IdxOfSecLett > -1
        );
      }
      // console.log(filterLettInName, idxOfFstLett, IdxOfSecLett);
    }
    let ob = {
      nameNIdxArr: nameNIdxArr,
      filteredNameLen: filterLettInName.length,
      nameLetter: filterLettInName[0],
      searchLetter: filterLettInSearch[0],
    };
    return ob;
  };
}

// _ifLettInArrayMoreThanOnce = (strArr: any, name: string) => {
//   console.log('here', strArr);
//   let splittedSearch = [...this._prodInCartSearch.split('')];
//   for (let i = 0; i < splittedSearch.length; i++) {
//     for (let j = 0; j < strArr.length; j++) {
//       // strArr[j].letter.toString().indexOf(splittedSearch[i]);
//       let ifMoreThanOneIdx = name.indexOf(splittedSearch[i]);
//       console.log(ifMoreThanOneIdx, splittedSearch[i]);
//       if (ifMoreThanOneIdx >= 0) {
//         console.log(
//           splittedSearch,

//           ifMoreThanOneIdx,
//           name.indexOf(splittedSearch[i], ifMoreThanOneIdx + 1),
//           strArr[name.indexOf(splittedSearch[i], ifMoreThanOneIdx + 1)],
//           strArr
//           // splittedSearch.indexOf(item.letter)
//         );
//         strArr[
//           name.indexOf(splittedSearch[i], ifMoreThanOneIdx + 1)
//         ].isSearched = false;
//       }
//     }
//   }
// };
// }

// `ID`, `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `CartID`, `ProductID`;
