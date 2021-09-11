import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-main-log-in',
  templateUrl: './main-log-in.component.html',
  styleUrls: ['./main-log-in.component.css'],
})
export class MainLogInComponent implements OnInit {
  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {}
}
