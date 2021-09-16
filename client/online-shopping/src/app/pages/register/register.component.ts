import { Component, OnInit } from '@angular/core';
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
  ) {}

  mailValidation = (e: any) => {
    this.confirmMail = true;
    this.confirmMailSuccess = e.target.value.includes('@') ? true : false;
  };

  identificationValidation = (e: any) => {
    this.confirmIdentification = true;
    this.confirmIdentificationSuccess =
      e.target.value.length != 9 ? false : true;
  };

  confirmPassword = (e: any) => {
    this.confirmPasswordText = true;
    let password = this.usersServiceService._User.Password;
    this.confirmPasswordSuccess = e.target.value != password ? false : true;
  };

  ngOnInit(): void {}
}
