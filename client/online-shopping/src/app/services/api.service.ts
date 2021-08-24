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
          (data: any) => {
            // console.log('Data : ', data);
            resolve(data);
          },
          (error: any) => {
            console.log('oops', error, error.error);
          }
        );
      } catch (err) {
        console.log('ERROR : ', err);
      }
    });
  }

  createPostService(params: string, ob?: any) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient
          .post(this.settingsService._baseUrl + params, ob)
          .subscribe(
            (data: any) => {
              // console.log('Data : ', data);
              resolve(data);
            },
            (err: any) => {
              console.log('oops', err, err.error);
            }
          );
      } catch (err) {
        console.log('ERROR : ', err);
      }
    });
  }
}
