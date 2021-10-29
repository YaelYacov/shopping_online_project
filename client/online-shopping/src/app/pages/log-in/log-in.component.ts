import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public cartsService: CartsService,
    public prodInCartService: ProdInCartService,
    public categoriesService: CategoriesService,
    public ordersService: OrdersService
  ) {
    this.assignStorage();
  }

  assignStorage = () => {
    if (localStorage.getItem('currentUser')) {
      const json: any = localStorage.getItem('currentUser');
      const currentUser: any = JSON.parse(json);
      this.usersServiceService._User.Mail = currentUser.Mail;
      this.usersServiceService._User.Password = currentUser.Password;
      this.usersServiceService._getUser(0);
      this.usersServiceService._logOut = true;
    }
  };

  ngOnInit(): void {}
}
