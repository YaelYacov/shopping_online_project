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

  _getAllProducts = async (CategoryID?: number) => {
    let getProds = !CategoryID
      ? { AllProds: 'All' }
      : { CategoryID: CategoryID };
    this._products = (await this.apiService.createPostService(
      'products/getAllProducts',
      getProds
    )) as Array<Product>;
    if (CategoryID) this._currentCategory = CategoryID;
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
