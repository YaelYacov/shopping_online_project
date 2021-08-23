import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private settingsService: SettingsService
  ) {}

  createGetService(params: string) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient.get(this.settingsService._baseUrl + params).subscribe(
          (data) => {
            // console.log('Data : ', data);
            resolve(data);
          },
          (error) => {
            console.log('oops', error, error.error);
          }
        );
      } catch (err) {
        console.log('ERRORRR : ', err);
      }
    });
  }

  createPostService(params: string, ob?: any) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient
          .post(this.settingsService._baseUrl + params, ob)
          .subscribe(
            (data) => {
              // console.log('Data : ', data);
              resolve(data);
            },
            (error) => {
              console.log('oops', error, error.error);
            }
          );
      } catch (err) {
        console.log('ERRORRR : ', err);
      }
    });
  }
}
