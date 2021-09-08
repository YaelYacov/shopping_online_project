import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersCartService {
  userCart: any;

  constructor(public apiService: ApiService) {}

  _getCartUserByUserID = async (ID?: number) => {
    let getUserCart = !ID ? { AllUserCarts: 'All' } : { ID: ID, userID: 1 };
    this.userCart = await this.apiService.createPostService(
      'userCart/getCartUserByUserID',
      getUserCart
    );

    console.log(this.userCart);
  };
}
