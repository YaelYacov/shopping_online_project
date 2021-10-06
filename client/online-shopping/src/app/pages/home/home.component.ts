import { Component, Input, OnInit } from '@angular/core';
// import { Product } from 'src/app/models/productsModel';
import { ProductsService } from 'src/app/services/products.service';

import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  resizable: boolean = false;
  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {
    this.prodInCartService._getProdInCartByCartID(
      this.usersServiceService._Users.CartID
    );

    // this.draggableEl.style.width = 290+"px"
  }

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
    // console.log(event.rectangle.right);
    // console.log(screen.width / 5 / 2);
    this.style = {
      position: 'relative',
      left: `${event.rectangle.left}px`,
      top: `20px`,
      bottom: `10px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };
    this.resizable = true;

    if (
      event.rectangle.right < screen.width / 5 &&
      event.rectangle.right > screen.width / 5 / 3
    )
      this.resizable = false;
  }

  deleteAllProdsFromCart = () => {
    console.log(this.prodInCartService._prodInCart);
    this.prodInCartService._prodInCart.forEach((prod) =>
      this.prodInCartService._deleteProdInCart(
        prod.ID,
        this.usersServiceService._Users.CartID
      )
    );
  };

  ngOnInit(): void {
    console.log(window.location.pathname);
  }
}
