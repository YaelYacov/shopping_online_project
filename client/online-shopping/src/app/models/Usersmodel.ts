import { Carts } from './cartsModel';

export class User {
  ID: number = 0;
  Fname: string = '';
  Lname: string = '';
  Mail: string = '';
  Identification: string = '';
  Password: string = '';
  City: string = '';
  Street: string = '';
  IsAdmin: string = '';
  CartID: number; //TODO: or null
  Carts: Array<Carts> = [];
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    ID?: number,
    Fname?: string,
    Lname?: string,
    Mail?: string,
    Identification?: string,
    Password?: string,
    City?: string,
    Street?: string,
    IsAdmin?: string,
    CartID?: number,
    Carts?: Array<Carts>,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.Fname = Fname || '';
    this.Lname = Lname || '';
    this.Mail = Mail || '';
    this.Identification = Identification || '';
    this.Password = Password || '';
    this.City = City || '';
    this.Street = Street || '';
    this.IsAdmin = IsAdmin || '';
    this.CartID = CartID || 0;
    this.Carts = Carts || [];
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}

// ID: 1,
// Fname: 'Yoshi',
// Lname: 'Yosh',
// Mail: 'yoshi@gmail.com ',
// Password: '111',
// Identification: 258963214,
// City: 'Bnei Brak',
// Street: 'Yonatan',
// IsAdmin: false,
// CartID: 1,
// createdAt: Invalid Date,
// updatedAt: 2021-08-18T20:33:09.000Z
