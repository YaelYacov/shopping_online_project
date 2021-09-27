import { Component, Input, OnInit } from '@angular/core';
// import { Product } from 'src/app/models/productsModel';
import { ProductsService } from 'src/app/services/products.service';

import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @Input() product = ''; // decorate the property with @Input()
  draggableEl: any;
  childEl: any;
  isReSize: boolean = false;
  third: boolean = true;
  half: boolean = false;
  twoOverThree: boolean = false;
  threeOverThree: boolean = false;

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

  // childOnMouseMove(event: MouseEvent) {
  //   console.log(this.draggableEl, this.childEl);
  //   if (this.childEl != undefined || this.childEl != null) {
  //     this.draggableEl = null;
  //     this.childEl = null;

  //     // this.prodInCartService._childEl = null;
  //   } else if (this.draggableEl && event.pageX > 350) {
  //     this.draggableEl = this.draggableEl.style.width = event.pageX + 'px';
  //     this.childEl = null;
  //     this.prodInCartService._childEl = null;
  //   }
  // }

  onMouseMove(event: MouseEvent) {
    // console.log(this.draggableEl, this.childEl);
    if (this.draggableEl && event.pageX > 350) {
      // this.isReSize = true;
      console.log('third');

      this.draggableEl.style.width = event.pageX + 'px';
      if (event.pageX < 750) {
        this.third = false;
        this.half = true;
        console.log('half');
      } else if (event.pageX < 1125) {
        this.half = false;
        this.twoOverThree = true;
        console.log('twoOverThree');
      } else if (event.pageX < 1500) {
        this.twoOverThree = false;
        this.threeOverThree = true;
        console.log('threeOverThree');
      }
      // console.log(event.pageX)
    }
    this.childEl = null;

    // console.log(event.target)
  }

  onMouseUp(event: MouseEvent) {
    console.log(event.pageX);
    // if (600 > event.pageX) {
    //   this.draggableEl.style.width = 350 + 'px';
    // }
    this.draggableEl = null;
    this.childEl = null;
    // this.isReSize = false;

    // this.prodInCartService._childEl = null;
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
