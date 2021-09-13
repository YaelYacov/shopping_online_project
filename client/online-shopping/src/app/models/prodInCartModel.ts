import { Product } from './productsModel';

export class ProdInCart {
  ID: number = 0;
  Name: string = '';
  Img: string = '';
  Price: number = 0;
  CategoryID: number = 0;
  Qnt: number = 1;
  Product: Array<Product> = [] as Array<Product>;
  createdAt: string = '';
  updatedAt: string = '';
  constructor(
    ID?: number,
    Name?: string,
    Img?: string,
    Price?: number,
    CategoryID?: number,
    Qnt?: number,
    Product?: Array<Product>,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.Name = Name || '';
    this.Img = Img || '';
    this.Price = Price || 0;
    this.CategoryID = CategoryID || 0;
    this.Qnt = Qnt || 1;
    this.Product = Product || ([] as Array<Product>);
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
