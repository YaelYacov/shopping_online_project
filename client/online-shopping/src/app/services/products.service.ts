import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  _products: any = [];

  constructor(public apiService: ApiService) {}

  _getAllProducts = async () => {
    this._products = await this.apiService.createPostService(
      'products/getAllProducts',
      { CategoryID: 2 }
      // { AllProds: 'All' }
    );
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
