import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from 'src/app/models/ordersModel';
import { User } from 'src/app/models/Usersmodel';

@Component({
  selector: 'app-main-log-in',
  templateUrl: './main-log-in.component.html',
  styleUrls: ['./main-log-in.component.css'],
})
export class MainLogInComponent implements OnInit {
  constructor(
    public settingsService: SettingsService,
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public prodInCartService: ProdInCartService
  ) {}

  draggableEl: any;

  findCart = () => {
    if (this.usersServiceService._Users) {
      let CartID = this.usersServiceService._Users.CartID;
      if (CartID == null)
        this.cartsService._addNewCart(this.usersServiceService._Users.ID);
    }
  };

  ngOnInit(): void {
    console.log(window.location.pathname);

    this.ordersService._isOrdering = false;
    this.ordersService._order = new Orders();
    this.usersServiceService._User = new User();
  }
}
