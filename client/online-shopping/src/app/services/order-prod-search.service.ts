import { Injectable } from '@angular/core';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { UsersServiceService } from './users-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrderProdSearchService {
  searchArr: Array<any> = [];
  nameLenArr: Array<string> | any = [];

  constructor(
    public prodInCartService: ProdInCartService,
    public usersServiceService: UsersServiceService
  ) {
    if (
      this.prodInCartService._prodInCart.length == 0 &&
      this.usersServiceService._Users
    ) {
      this.prodInCartService._getProdInCartByCartID(
        this.usersServiceService._Users.CartID
      );
    }
  }
  deleteAll = () => {
    this.prodInCartService.strArr.map(
      (item: { isSearched: boolean; isChangeable: boolean }) => {
        item.isSearched = false;
        item.isChangeable = true;
      }
    );
  };

  getName = async (Name: string | any) => {
    if (
      this.prodInCartService._prodInCart.length == 0 &&
      this.usersServiceService._Users
    ) {
      await this.prodInCartService._getProdInCartByCartID(
        this.usersServiceService._Users.CartID
      );
    }
    let splittedSearch: Array<string> = [
      ...this.prodInCartService._prodInCartSearch.split(''),
    ];

    for (let i = 0; i < Name.length; i++) {
      if (this.nameLenArr.length < i + 1) {
        this.nameLenArr.push({
          letter: Name[i],
          isSearched: false,
          isChangeable: true,
          Idx: i,
        });
      }
    }
    this.prodInCartService.strArr = [...this.nameLenArr];

    if (
      splittedSearch.length > 0 &&
      this.searchArr.length < splittedSearch.length
    )
      this.searchArr.push({
        letter: splittedSearch[splittedSearch.length - 1],
        isUsed: false,
      });
    else if (this.searchArr.length > splittedSearch.length)
      this.searchArr.pop();

    if (this.prodInCartService._prodInCartSearch.length == 0) {
      this.deleteAll();
      this.searchArr = [];
    } else if (this.prodInCartService._prodInCartSearch.length > 0) {
      this.deleteAll();
      let idxOfSearchInName = Name.indexOf(
        this.prodInCartService._prodInCartSearch
      );
      if (idxOfSearchInName == -1) {
        this.deleteAll();
      } else if (idxOfSearchInName > -1) {
        for (let i = 0; i < this.searchArr.length; i++) {
          if (
            this.prodInCartService.strArr[idxOfSearchInName + i].letter ==
            this.searchArr[i].letter
          ) {
            this.prodInCartService.strArr[idxOfSearchInName + i].isSearched =
              true;
            this.prodInCartService.strArr[idxOfSearchInName + i].isChangeable =
              false;
            this.searchArr[i].isUsed = true;
          }
        }
      }
    }
  };
}
