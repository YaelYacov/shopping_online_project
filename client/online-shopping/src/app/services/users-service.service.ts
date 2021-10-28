import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/Usersmodel';
import { ApiService } from './api.service';
import { ProdInCartService } from './prod-in-cart.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  _Users: any;
  _manyUsers: any;
  // _Users: Array<User> = [];
  _currentUser: User = new User();
  _User: User = new User();
  _currentUserID: any;
  _currentCartID: any;
  _createdAt: string = '';
  _totP: number = 0;

  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public prodInCartService: ProdInCartService,
    private router: Router
  ) {}

  async _getUser(type?: number) {
    this._Users = (await this.apiService.createPostService(
      `users/getUserByMailNPass`,
      { Password: this._User.Password, Mail: this._User.Mail }
    )) as Array<User>;
    if (type == 0) {
      this.ifUsers(this._Users.CartID);
      let string = JSON.stringify(this._Users);
      localStorage.setItem('currentUser', string);
      console.log(localStorage.getItem('currentUser'));
    }
    if (this._Users && this._Users.IsAdmin == 1)
      // console.log('1: ', this._Users);
      this.router.navigate(['home']);
    else if (this._Users && this._Users.CartID > 0) {
      this._currentUserID = this._Users.ID;
      this._currentCartID = this._Users.CartID;
    }
    // console.log(this._currentCartID);
  }

  ifUsers = async (CartID: number) => {
    await this.prodInCartService._getProdInCartByCartID(CartID);
    if (this.prodInCartService._prodInCart.length > 0) {
      this._totP = this.prodInCartService._totalPrice;
      this._createdAt = this._Users.Carts[
        this._Users.Carts.length - 1
      ].createdAt.slice(0, 10);
    } else {
      this._totP = 0;
      this._createdAt = this._Users.Carts[
        this._Users.Carts.length - 2
      ].createdAt.slice(0, 10);
    }
  };

  async _updateUserCart(values: object) {
    (await this.apiService.createPostService(
      `users/updateUserCart`,
      values
    )) as Array<User>;
    // console.log(this._User);
    this._getUser();
  }

  async _createNewUser() {
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
  async _getAllUsers() {
    this._manyUsers = (await this.apiService.createGetService(
      `users/getAllUsers`
    )) as Array<User>;
    // return this._manyUsers;
  }
}

// {"ID":1,"Fname":"Yoshi","Lname":"Yosh","Mail":"yoshi@gmail.com ","Password":"111","Identification":258963214,"City":"Bnei Brak","Street":"Yonatan","IsAdmin":false,"createdAt":null,"updatedAt":null}
