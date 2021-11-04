import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-register-panel-b',
  templateUrl: './register-panel-b.component.html',
  styleUrls: ['./register-panel-b.component.css'],
})
export class RegisterPanelBComponent implements OnInit {
  constructor(public usersServiceService: UsersServiceService) {}

  submitRegistration = () => {
    if (
      this.usersServiceService._User.City == '0' ||
      this.usersServiceService._User.City == '' ||
      this.usersServiceService._User.Street == '' ||
      this.usersServiceService._User.Fname == '' ||
      this.usersServiceService._User.Lname == ''
    )
      alert('Please fill in all the required fields.');
    else this.usersServiceService._createNewUser();
  };

  ngOnInit(): void {}
}
