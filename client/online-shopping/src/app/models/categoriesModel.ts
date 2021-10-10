export class Categories {
  ID: number = 0;
  Name: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    ID?: number,
    Name?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.Name = Name || '';
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
