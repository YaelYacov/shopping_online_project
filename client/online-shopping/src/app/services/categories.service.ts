import { Injectable } from '@angular/core';
import { Categories } from '../models/categoriesModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  _categories: Array<Categories> = [];
  _newCat: string = '';
  constructor(public apiService: ApiService) {}

  _getAllCategories = async () => {
    this._categories = (await this.apiService.createPostService(
      'categories/getAllCategories'
    )) as Array<Categories>;
    // console.log(this._categories);
  };

  _addNewCat = async () => {
    await this.apiService.createPostService('categories/addNewCat', {
      Name: this._newCat,
    });
    this._getAllCategories();
  };
}
