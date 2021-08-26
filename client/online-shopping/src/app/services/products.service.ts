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
  constructor(public apiService: ApiService) {}

  _getAllProducts = async (reqCat: any) => {
    this._products = (await this.apiService.createPostService(
      'products/getAllProducts',
      reqCat
    )) as Array<Product>;
    // { CategoryID: 2 }
    console.log(this._products);
  };

  async _addNewProd() {
    await this.apiService.createPostService('products/addNewProd', {
      Name: 'ff',
      Price: 76.8,
      CategoryID: 1,
    });

    this._getAllProducts({ AllProds: 'All' });
  }

  async _editProd() {
    await this.apiService.createPostService('products/editProd', {
      ID: 1,
      editCol: { Name: 'White whine!', Price: 91.9 },
    });

    this._getAllProducts({ AllProds: 'All' });
  }
}
