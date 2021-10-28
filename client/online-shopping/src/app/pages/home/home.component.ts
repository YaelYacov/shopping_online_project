import { Component, Input, OnInit } from '@angular/core';
// import { Product } from 'src/app/models/productsModel';
import { ProductsService } from 'src/app/services/products.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
import { OrdersService } from 'src/app/services/orders.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  resizable: boolean = false;
  openCart: boolean = false;
  adminEdit: boolean = false;
  constructor(
    public usersServiceService: UsersServiceService,
    private router: Router,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService,
    public ordersService: OrdersService,
    public cartsService: CartsService
  ) {}

  public style: any;

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = screen.width / 5;
    // console.log(event.rectangle);
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      event.rectangle.width > MIN_DIMENSIONS_PX
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: any): void {
    // console.log(event.rectangle);
    this.style = {
      position: 'relative',
      left: `0`,
      top: `20px`,
      bottom: `10px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };
    this.resizable = true;

    if (
      event.rectangle.right < screen.width / 5 + 20 &&
      event.rectangle.right > screen.width / 5 / 3
    )
      this.resizable = false;
  }

  deleteAllProdsFromCart = () => {
    let r = confirm('Press a button!');
    console.log(r);
    debugger;
    if (r == true) {
      this.prodInCartService._prodInCart.forEach((prod) =>
        this.prodInCartService._deleteProdInCart(
          prod.ID,
          this.usersServiceService._Users.CartID
        )
      );
    }
  };

  addOrEditOrder = () => {
    this.ordersService._isOrdering = true;
    this.prodInCartService._fromOrders = true;
  };

  ngOnInit(): void {
    this.prodInCartService._fromOrders = false;
    let greaterThan0 =
      this.usersServiceService._Users && this.usersServiceService._Users.ID > 0;
    if (!greaterThan0) this.router.navigateByUrl('/logIn');
    this.usersServiceService._getUser();
    if (
      this.usersServiceService._currentUserID > 0 &&
      this.usersServiceService._Users.CartID > 0
    ) {
      this.productsService._isAdding = false;
      this.productsService._isEditing = false;
      this.prodInCartService._getProdInCartByCartID(
        this.usersServiceService._Users.CartID
      );
    }
  }
}
