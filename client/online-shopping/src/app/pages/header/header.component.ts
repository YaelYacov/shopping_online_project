import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { SettingsService } from 'src/app/services/settings.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logOut: boolean = false;

  constructor(
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public usersServiceService: UsersServiceService,
    public settingsService: SettingsService,
    public ordersService: OrdersService,
    public prodInCartService: ProdInCartService,
    private router: Router
  ) {
    this.productsService._getAllProducts();
    this.ordersService._isOrdering;
  }

  ngOnInit(): void {
    if (this.usersServiceService._User.ID! > 0)
      this.router.navigateByUrl('/home');

    // if(this.usersServiceService._User.)
  }
}
