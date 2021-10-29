import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/Usersmodel';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  confirmPasswordText: boolean = false;
  confirmPasswordSuccess: boolean = false;
  confirmIdentification: boolean = false;
  confirmIdentificationSuccess: boolean = false;
  confirmMail: boolean = false;
  confirmMailSuccess: boolean = false;

  constructor(
    public usersServiceService: UsersServiceService,
    public settingsService: SettingsService
  ) {
    this.usersServiceService._User = new User();
  }

  validateEmail = async (email: string) => {
    await this.usersServiceService._getAllUsers();
    let findMail = this.usersServiceService._manyUsers.find(
      (user: any) => user.Mail == this.usersServiceService._User.Mail
    );
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) == true && findMail == undefined
      ? true
      : false;
  };
  mailValidation = async (e: any) => {
    this.confirmMail = true;
    this.confirmMailSuccess =
      (await this.validateEmail(this.usersServiceService._User.Mail)) == true
        ? true
        : false;
  };

  identificationValidation = async (e: any) => {
    await this.usersServiceService._getAllUsers();
    let findID = this.usersServiceService._manyUsers.find(
      (user: any) =>
        user.Identification == this.usersServiceService._User.Identification
    );
    let re = /^[0-9]{9}$/g;
    this.confirmIdentification = true;
    this.confirmIdentificationSuccess =
      re.test(this.usersServiceService._User.Identification) &&
      findID == undefined
        ? true
        : false;
  };

  confirmPassword = (e: any) => {
    this.confirmPasswordText = true;
    let password = this.usersServiceService._User.Password;
    this.confirmPasswordSuccess = e.target.value != password ? false : true;
  };

  changeRegisterPB = (registerPB: boolean) => {
    if (
      this.usersServiceService._User.Identification.length != 9 &&
      this.usersServiceService._User.Mail != '' &&
      this.confirmMailSuccess &&
      this.usersServiceService._User.Password != '' &&
      this.confirmPasswordSuccess &&
      this.confirmIdentificationSuccess
    ) {
      this.usersServiceService._registerPanelB = registerPB;
      this.usersServiceService._isRegister = false;
    } else alert('Please fill in all the required fields.');
  };

  ngOnInit(): void {}
}
