import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}
  _baseUrl: string = 'http://localhost:5000/';
  _isRegister: boolean = false;
  _registerPanelB: boolean = false;

  _changeRegisterStatus = (isRegister: boolean) => {
    this._isRegister = isRegister;
    this._registerPanelB = false;

    console.log(this._isRegister);
  };
  _changeRegisterPB = (registerPB: boolean) => {
    this._registerPanelB = registerPB;
    this._isRegister = false;
  };
}
