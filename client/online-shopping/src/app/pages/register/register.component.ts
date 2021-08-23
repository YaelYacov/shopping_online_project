import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  confirmPasswordText: boolean = false;
  confirmPasswordSuccess: boolean = false;

  constructor(public usersServiceService: UsersServiceService) {}

  confirmPassword = (e: any) => {
    this.confirmPasswordText = true;
    let password = this.usersServiceService._User.Password;
    console.log(password);
    console.log(e.target.value);
    this.confirmPasswordSuccess = e.target.value != password ? false : true;
    // ? 'confirm password is no accurate'
    // : 'confirm password is no accurate';
  };

  ngOnInit(): void {}
}
