import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/Usersmodel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

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

    public settingsService: SettingsService,
    private router: Router
  ) {}

  async _getUser() {
    this._Users = (await this.apiService.createPostService(
      `users/getUserByMailNPass`,
      { Password: this._User.Password, Mail: this._User.Mail }
    )) as Array<User>;
    // console.log('1: ', this._Users);
    if (this._Users && this._Users.IsAdmin == 1) this.router.navigate(['home']);
    else if (this._Users && this._Users.CartID > 0) {
      this._currentUserID = this._Users.ID;
      this._currentCartID = this._Users.CartID;
    }
    // console.log(this._currentCartID);
  }

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
}

// {"ID":1,"Fname":"Yoshi","Lname":"Yosh","Mail":"yoshi@gmail.com ","Password":"111","Identification":258963214,"City":"Bnei Brak","Street":"Yonatan","IsAdmin":false,"createdAt":null,"updatedAt":null}
