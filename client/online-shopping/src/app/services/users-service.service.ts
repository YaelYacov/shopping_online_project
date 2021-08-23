import { Injectable } from '@angular/core';
import { User } from '../models/Usersmodel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  // _User: any = [];
  _Users: Array<User> = [];
  _User: User = new User();

  constructor(public apiService: ApiService) {}

  async _getUser() {
    this._Users = (await this.apiService.createPostService(
      `users/getUserByMailNPass`,
      { Password: '111', Mail: 'yoshi@gmail.com' }
    )) as Array<User>;
    console.log(this._User);
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
    // await this.apiService.createPostService('users/createNewUser', {
    //   Fname: this._User.Fname,
    //   Lname: this._User.Lname,
    //   Mail: this._User.Mail,
    //   Password: this._User.Password,
    //   Identification: this._User.Identification,
    //   City: this._User.City,
    //   Street: this._User.Street,
    //   IsAdmin: false,
    // });

    // this._getUser();
  }
}

// {"ID":1,"Fname":"Yoshi","Lname":"Yosh","Mail":"yoshi@gmail.com ","Password":"111","Identification":258963214,"City":"Bnei Brak","Street":"Yonatan","IsAdmin":false,"createdAt":null,"updatedAt":null}
