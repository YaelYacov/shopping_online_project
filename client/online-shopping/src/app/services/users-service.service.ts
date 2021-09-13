import { Injectable } from '@angular/core';
import { User } from '../models/Usersmodel';
import { ApiService } from './api.service';
import { CartsService } from './carts.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  _Users: any;
  // _Users: Array<User> = [];
  _currentUser: User = new User();
  _User: User = new User();
  _currentUserID: any;
  _currentCartID: any;

  constructor(
    public apiService: ApiService,
    public cartsService: CartsService
  ) {}

  async _getUser() {
    this._Users = (await this.apiService.createPostService(
      `users/getUserByMailNPass`,
      { Password: this._User.Password, Mail: this._User.Mail }
    )) as Array<User>;

    // this._currentUser = (await this.apiService.createPostService(
    //   `users/getUserByMailNPass`,
    //   { Password: this._User.Password, Mail: this._User.Mail }
    // )) as User;
    // console.log('1: ', this._currentUser);
    // console.log('1: ', this._Users);

    // GOOD LUCK <30

    if (this._Users && this._Users.CartID > 0) {
      this._currentUserID = this._Users.ID;
      this._currentCartID = this._Users.CartID;
    }
    // else {
    // this.cartsService._getCartByID(); // TODO: send ID
    // console.log(this.cartsService._cart);
    // console.log('2: ', this._Users);
    // }

    // if (this._Users) {
    //   this._currentUserID = this._Users.ID;
    //   if (this._Users.CartID === 0) {
    //     this._currentCartID = this._Users.CartID;
    //     this.cartsService._getCartByID();
    //     console.log(this.cartsService._cart);
    //     console.log('2: ', this._Users);
    //   }
    // }
  }

  async _updateUserCart() {
    (await this.apiService.createPostService(`users/updateUserCart`, {
      ID: 2,
      CartID: 2,
    })) as Array<User>;
    console.log(this._User);
    this._getUser();
  }

  async _createNewUser() {
    console.log(this._User);
    let register = await this.apiService.createPostService(
      'users/createNewUser',
      {
        Fname: this._User.Fname,
        Lname: this._User.Lname,
        Mail: this._User.Mail,
        Password: this._User.Password,
        Identification: this._User.Identification,
        City: this._User.City,
        Street: this._User.Street,
        IsAdmin: false,
      }
    );

    this._getUser();
  }
}

// {"ID":1,"Fname":"Yoshi","Lname":"Yosh","Mail":"yoshi@gmail.com ","Password":"111","Identification":258963214,"City":"Bnei Brak","Street":"Yonatan","IsAdmin":false,"createdAt":null,"updatedAt":null}
