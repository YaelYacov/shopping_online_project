import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  _categories: any = [];
  constructor(public apiService: ApiService) {}

  _getAllCategories = async () => {
    this._categories = await this.apiService.createPostService(
      'categories/getAllCategories'
    );
    console.log(this._categories);
  };
}
