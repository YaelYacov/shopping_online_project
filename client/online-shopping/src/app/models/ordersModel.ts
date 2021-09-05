import { User } from './Usersmodel';

export class Orders {
  ID: number = 0;
  City: string = '';
  Street: string = '';
  LastDigitsOfCard: string = '';
  OrderInPlace: boolean = false;
  TotalPrice: number = 0;
  user: Array<User> = [];
  createdAt: string = '';
  updatedAt: string = '';
  constructor(
    ID?: number,
    City?: string,
    Street?: string,
    LastDigitsOfCard?: string,
    OrderInPlace?: boolean,
    TotalPrice?: number,
    user?: Array<User>,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.City = City || '';
    this.Street = Street || '';
    this.LastDigitsOfCard = LastDigitsOfCard || '';
    this.OrderInPlace = OrderInPlace || false;
    this.TotalPrice = TotalPrice || 0;
    this.user = user || [];
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}

// City: "Bnei Brak"
// ID: 1
// LastDigitsOfCard: "4456"
// OrderInPlace: false
// Street: "Yonatan"
// TotalPrice: 33
// createdAt: null
// updatedAt: null
// user: {ID: 1, Fname: "Yoshi", Lname: "Yosh", Mail: "yoshi@gmail.com ", Password: "111", …}
// userID: 1

// user: CartID: null;
// City: 'Bnei Brak';
// Fname: 'Yoshi';
// ID: 1;
// Identification: 258963214;
// IsAdmin: false;
// Lname: 'Yosh';
// Mail: 'yoshi@gmail.com ';
// Password: '111';
// Street: 'Yonatan';
// createdAt: null;
