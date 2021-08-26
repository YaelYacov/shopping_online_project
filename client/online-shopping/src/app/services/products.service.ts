import { Injectable } from '@angular/core';
import { Product } from '../models/productsModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // _products: <Array><Product>;
  // _products : <Array><Products> = [];

  _products: Array<Product> = [];
  _filteredProds: Array<Product> = [];
  _currentCategory: any;

  constructor(public apiService: ApiService) {}

  _defineCategory = (CategoryID?: number) => {
    this._currentCategory = CategoryID;
    // console.log(CategoryID, this._currentCategory);
  };

  _filterCategories = (CategoryID?: number) => {
    // console.log(CategoryID);
    // console.log(this._products);

    if (!CategoryID) {
      return this._products;
    } else {
      // this.productsService._getAllProducts();
      // this._getAllProducts();

      // console.log(this._filteredProds);
      return (this._filteredProds = [
        ...this._products.filter((prod) => prod.CategoryID == CategoryID),
      ]);

      // this._products = this._filteredProds;
    }
  };

  _getAllProducts = async () => {
    this._products = (await this.apiService.createPostService(
      'products/getAllProducts'
    )) as Array<Product>;
    console.log(this._products);
  };

  async _addNewProd() {
    await this.apiService.createPostService('products/addNewProd', {
      Name: 'ff',
      Price: 76.8,
      CategoryID: 1,
    });

    this._getAllProducts();
  }

  async _editProd() {
    await this.apiService.createPostService('products/editProd', {
      ID: 1,
      editCol: { Name: 'White whine!', Price: 91.9 },
    });

    this._getAllProducts();
  }
}
