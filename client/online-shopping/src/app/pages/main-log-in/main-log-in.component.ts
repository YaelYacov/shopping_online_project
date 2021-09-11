import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

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
    public prodInCartService: ProdInCartService
  ) {}
  findCart = () => {
    if (this.usersServiceService._Users) {
      let CartID = this.usersServiceService._Users.CartID;
      if (CartID > 0) {
        console.log(CartID);
        console.log(this.prodInCartService._getProdInCartByCartID(CartID));
      } else this.cartsService._addNewCart();
    }
  };

  ngOnInit(): void {}
}
