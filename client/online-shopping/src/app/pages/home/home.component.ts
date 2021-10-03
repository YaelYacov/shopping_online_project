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
  oneFifths: boolean = true;
  twoFifths: boolean = false;
  threeFifths: boolean = false;
  fourFifths: boolean = false;
  fiveFifths: boolean = false;
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
      (event.rectangle.width < MIN_DIMENSIONS_PX - 5 ||
        event.rectangle.width > (screen.width / 5) * 4 + 20)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log(event.rectangle.right);
    this.style = {
      position: 'relative',
      left: `${event.rectangle.left}px`,
      top: `20px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };
    let relativeToScreenWidth: number = 1;
    relativeToScreenWidth = screen.width / 5;

    if (event.rectangle.right < relativeToScreenWidth * 2) {
      this.oneFifths = true;
      this.twoFifths = false;
      this.threeFifths = false;
      this.fourFifths = false;
      this.fiveFifths = false;
      this.style.width = `${relativeToScreenWidth}px`;
    } else if (event.rectangle.right < relativeToScreenWidth * 3) {
      this.oneFifths = false;
      this.twoFifths = true;
      this.threeFifths = false;
      this.fourFifths = false;
      this.fiveFifths = false;
      this.style.width = `${relativeToScreenWidth * 2}px`;
    } else if (event.rectangle.right < relativeToScreenWidth * 4) {
      this.oneFifths = false;
      this.twoFifths = false;
      this.threeFifths = true;
      this.fourFifths = false;
      this.fiveFifths = false;
      this.style.width = `${relativeToScreenWidth * 3}px`;
    } else if (event.rectangle.right < relativeToScreenWidth * 5) {
      this.oneFifths = false;
      this.twoFifths = false;
      this.threeFifths = false;
      this.fourFifths = true;
      this.fiveFifths = false;
      this.style.width = `${relativeToScreenWidth * 4}px`;
    } else {
      this.oneFifths = false;
      this.twoFifths = false;
      this.threeFifths = false;
      this.fourFifths = false;
      this.fiveFifths = true;
      this.style.width = `${relativeToScreenWidth * 5}px`;
    }
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

  ngOnInit(): void {}
}
