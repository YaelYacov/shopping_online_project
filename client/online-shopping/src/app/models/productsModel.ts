export class Product {
  ID: number = 0;
  Name: string = '';
  Img: string = '';
  Price: number = 0;
  description: string = '';
  CategoryID: number = 0;
  Qnt: number = 1;
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    ID?: number,
    Name?: string,
    Img?: string,
    Price?: number,
    description?: string,
    CategoryID?: number,
    Qnt?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.Name = Name || '';
    this.Img = Img || '';
    this.Price = Price || 0;
    this.description = description || '';
    this.CategoryID = CategoryID || 0;
    this.Qnt = Qnt || 1;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
// `ID`, `Name`, `Price`, `Img`, `createdAt`, `updatedAt`, `CategoryID`;
