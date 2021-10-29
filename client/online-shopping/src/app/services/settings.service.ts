import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}
  _baseUrl: string = 'http://localhost:5000/';
}
