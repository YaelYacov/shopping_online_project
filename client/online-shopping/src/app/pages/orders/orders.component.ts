import { Component, OnInit } from '@angular/core';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    public prodInCartService: ProdInCartService,
    public usersServiceService: UsersServiceService,
    public ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let greaterThan0 = this.usersServiceService._currentUserID > 0;
    if (!greaterThan0) this.router.navigateByUrl('/logIn');
    // else if (
    //   !this.ordersService._orders.find(
    //     (item) =>
    //       item.userID == this.usersServiceService._currentUserID &&
    //   )
    // )
    //   this.ordersService._addNewOrder(this.ordersService._order);
  }
}
