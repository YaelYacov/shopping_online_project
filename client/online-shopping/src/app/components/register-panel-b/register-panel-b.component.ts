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

  ngOnInit(): void {}
}
