import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css'],
})
export class OrdersFormComponent implements OnInit {
  dates: Array<any> = [];

  constructor(
    public ordersService: OrdersService,
    public usersServiceService: UsersServiceService,
    public prodInCartService: ProdInCartService
  ) {
    this.calcFourteenDays();
  }
  // `ID`, `TotalPrice`, `City`, `Street`, `OrderInPlace`, `LastDigitsOfCard`, `createdAt`, `updatedAt`, `userID
  filtered: Array<any> = [];

  monthConvertor = (num: any) => {
    let month: Array<object> = [
      { str: 'Jan', number: '01' },
      { str: 'Feb', number: '02' },
      { str: 'Mar', number: '03' },
      { str: 'Apr', number: '04' },
      { str: 'May', number: '05' },
      { str: 'Jun', number: '06' },
      { str: 'Jul', number: '07' },
      { str: 'Aug', number: '08' },
      { str: 'Sep', number: '09' },
      { str: 'Oct', number: '10' },
      { str: 'Nov', number: '11' },
      { str: 'Dec', number: '12' },
    ];
    let findMonth: any = month.find((item: any) => item.str == num);

    return findMonth;
  };

  returnFiltered = (date: string) => {
    let day: string = date.slice(8, 10);
    let month: string = date.slice(4, 7);
    let year: string = date.slice(11, 16);
    let numMonth: any = this.monthConvertor(month);
    let fullDate = year + '-' + numMonth.number + '-' + day;

    let filtered = this.filtered;

    filtered = this.ordersService._orders.filter((item) => {
      return item.ShippingDate == fullDate;
    });
    console.log(filtered);
    if (filtered.length == 3) {
      return true;
    } else {
      return false;
    }
  };

  calcFourteenDays = () => {
    let days = 14;
    let arr = [];
    let myCurrentDate = new Date();

    for (let i = 0; i < days; i++) {
      let myFutureDate: any = new Date(myCurrentDate);
      myFutureDate.setDate(myCurrentDate.getDate() + i);
      myFutureDate.toLocaleDateString();
      console.log(myFutureDate);
      arr.push(myFutureDate.toString().slice(0, 15));
    }
    this.dates = arr;
    return this.dates;
  };

  chooseDefault = (type: number) => {
    //type: 0 - city, 1 - street, 2 -cardDigit
    console.log(this.ordersService._order);
    console.log(this.usersServiceService._Users.City);
    if (this.usersServiceService._Users) {
      if (type == 0)
        this.ordersService._order.City = this.usersServiceService._Users.City;
      else if (type == 1)
        this.ordersService._order.Street =
          this.usersServiceService._Users.Street;
    }
    console.log(this.ordersService._order);
  };

  ngOnInit(): void {
    this.usersServiceService._Users ? this.ordersService._getOrders() : null;
    this.prodInCartService._fromOrders = this.usersServiceService._Users
      ? true
      : false;
  }
}
