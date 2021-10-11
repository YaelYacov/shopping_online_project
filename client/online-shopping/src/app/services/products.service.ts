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
  Name: string = '';

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
    // console.log(this._products);
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

  _editOrAddIcons = (isPlus: boolean, prodEditID?: number) => {
    if (isPlus && !this._isAdding) {
      this._isAdding = true;
      this._isEditing = false;
      this._currentProdId = 0;
      // console.log('once from plus: ', this._currentProdId);
    } else if (
      (!isPlus && !this._isEditing) ||
      (!isPlus &&
        this._isEditing &&
        this._currentProdId != 0 &&
        this._currentProdId != prodEditID)
    ) {
      this._isAdding = false;
      this._isEditing = true;
      prodEditID = this._currentProdId;
      // console.log('once from edit or sec or more edit: ', this._currentProdId);
    } else if ((isPlus && this._isAdding) || (!isPlus && this._isEditing)) {
      this._isAdding = false;
      this._isEditing = false;
      this._currentProdId = 0;

      // console.log('sec from plus or edit : ', this._currentProdId);
    }
  };
}
