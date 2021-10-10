import { Injectable } from '@angular/core';
import { Product } from '../models/productsModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  _products: Array<Product> = [];
  // _filteredProds: Array<Product> = [];
  _product: Product = new Product();
  _currentCategory: any;
  _ProdName: string = '';
  _isAdding: boolean = false; //or edit
  _isEditing: boolean = false;
  _currentProdId: number = 0;
  // _imgUrl: string = '';

  constructor(public apiService: ApiService) {}

  _getAllProducts = async (CategoryID?: number) => {
    let getProds = !CategoryID
      ? { AllProds: 'All' }
      : { CategoryID: CategoryID };
    this._products = (await this.apiService.createPostService(
      'products/getAllProducts',
      getProds
    )) as Array<Product>;
    this._products.map((prod) => (prod.isAdminEdit = false));
    if (CategoryID) this._currentCategory = CategoryID;
    // console.log(this._products);
  };

  _getProdByName = async (Name: any) => {
    this._products = (await this.apiService.createPostService(
      'products/getProdByName',
      { Name: Name }
    )) as Array<Product>;
    console.log(this._products);
  };

  _addNewProd = async (addProdOB: object) => {
    await this.apiService.createPostService('products/addNewProd', addProdOB);
    this._getAllProducts();
  };

  _editProd = async (ID: number, editCol: object) => {
    await this.apiService.createPostService('products/editProd', {
      ID: ID,
      editCol: editCol,
    });

    this._getAllProducts();
  };
}
