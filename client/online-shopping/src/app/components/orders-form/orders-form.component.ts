import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { Orders } from 'src/app/models/ordersModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css'],
})
export class OrdersFormComponent implements OnInit {
  dates: Array<any> = [];
  filtered: Array<any> = [];
  Date: string = '';
  constructor(
    public ordersService: OrdersService,
    public usersServiceService: UsersServiceService,
    public prodInCartService: ProdInCartService,
    private router: Router
  ) {
    this.calcFourteenDays();
  }

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
    this.Date = '';
    let day: string = date.slice(8, 10);
    let month: string = date.slice(4, 7);
    let year: string = date.slice(11, 16);
    let numMonth: any = this.monthConvertor(month);
    let fullDate = year + '-' + numMonth.number + '-' + day;
    let filtered: any;
    filtered = this.ordersService._orders.filter((item) => {
      return item.ShippingDate == fullDate;
    });
    this.filtered = filtered;
    if (filtered.length > 2) {
      return [true, fullDate];
    } else {
      return [false, fullDate];
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
      arr.push(myFutureDate.toString().slice(0, 15));
    }
    this.dates = arr;
    return this.dates;
  };

  chooseDefault = (type: number) => {
    //type: 0 - city, 1 - street, 2 -cardDigit
    if (this.usersServiceService._Users) {
      if (type == 0)
        this.ordersService._order.City = this.usersServiceService._Users.City;
      else if (type == 1)
        this.ordersService._order.Street =
          this.usersServiceService._Users.Street;
    }
  };

  editNAddOrder = () => {
    let ob: object | any = {};
    let lastDigits: string =
      this.ordersService._order.LastDigitsOfCard.toString();
    let slicedString: string = '';

    if (this.ordersService._isCreditCard(lastDigits)) {
      slicedString = lastDigits.slice(lastDigits.length - 4, lastDigits.length);
      ob.LastDigitsOfCard = slicedString;
    } else alert('Wrong Credit Card Number');

    this.ordersService._order.ShippingDate == ''
      ? alert('Please select Shipping Date!')
      : (ob.ShippingDate = this.ordersService._order.ShippingDate);

    this.ordersService._order.City == ''
      ? alert('Please select City!')
      : (ob.City = this.ordersService._order.City);

    this.ordersService._order.Street == ''
      ? alert('Please select street')
      : (ob.Street = this.ordersService._order.Street);

    ob.userID = this.usersServiceService._Users.ID;

    ob.TotalPrice = this.prodInCartService._totalPrice;
    ob.CartID = this.usersServiceService._Users.CartID;
    if (
      this.ordersService._order.Street != '' &&
      this.ordersService._order.City != '' &&
      this.ordersService._order.ShippingDate != '' &&
      this.ordersService._isCreditCard(lastDigits)
    ) {
      this.ordersService._addNewOrder(ob);
      this.router.navigateByUrl('/orderInPlace');
    } else alert('something went wrong, please reload the page');
  };

  ngOnInit(): void {
    this.ordersService._order = new Orders();
    this.usersServiceService._Users ? this.ordersService._getOrders() : null;
    this.prodInCartService._fromOrders = this.usersServiceService._Users
      ? true
      : false;
  }
}
