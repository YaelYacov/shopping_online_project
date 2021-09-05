export class Carts {
  ID: number = 0;
  Status: number = 0;
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    ID?: number,
    Status?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.Status = Status || 0;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
