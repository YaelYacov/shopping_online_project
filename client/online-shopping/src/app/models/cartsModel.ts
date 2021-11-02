export class Carts {
  ID: number = 0;
  userID: number = 0;
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    ID?: number,
    userID?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.userID = userID || 0;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
