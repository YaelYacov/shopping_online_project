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
  childDraggableEl: any;
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

  // onMouseOver(event: any) {
  //   if (this.draggableEl && event.path.length == 10)
  //     this.draggableEl.style.cursor = 'e-resize';
  // }

  onMouseMove(event: any) {
    // console.log(event.target.classList.value);
    // console.log(this.childDraggableEl);
    // console.log(this.draggableEl);
    if (this.draggableEl) {
      // this.isReSize = true;

      // if (event.path.length == 10) {
      // if (event.target.classList.value == 'borderR') {
      // console.log(this.draggableEl && event.pageX > 350);
      // console.log('third');
      // this.third = true;
      // this.half = false;
      // this.twoOverThree = false;
      // this.threeOverThree = false;
      console.log(event.target.classList.value);
      this.childDraggableEl = null;
      this.draggableEl.style.cursor = 'e-resize';
      this.draggableEl.style.width = event.pageX + 'px';
      // this.childDraggableEl.style.cursor = 'context-menu';

      if (event.pageX < 750) {
        this.third = false;
        this.half = true;
        this.twoOverThree = false;
        this.threeOverThree = false;
        // console.log(event.target.classList.value);

        // console.log('half');
      } else if (event.pageX < 1125) {
        this.third = false;
        this.half = false;
        this.twoOverThree = true;
        this.threeOverThree = false;
        // console.log(event.target.classList.value);

        // console.log('twoOverThree');
      } else if (event.pageX < 1500) {
        this.third = false;
        this.half = false;
        this.twoOverThree = false;
        this.threeOverThree = true;
        // console.log(event.target.classList.value);
      }
      // }
      //  else {
      //   this.draggableEl.style.width = 350 + 'px';
      //   this.draggableEl.style.borderRight = 15 + 'px';

      //   this.draggableEl = null;
      // }
    }
    // else {
    //   this.third = true;
    //   this.half = false;
    //   this.twoOverThree = false;
    //   this.threeOverThree = false;
    // }
  }

  onMouseUp(event: any) {
    // console.log(event.path.length);
    console.log(event.pageX);
    // console.log(this.draggableEl == true);
    // this.draggableEl.style.width = 350 + 'px';
    if (this.draggableEl && this.childDraggableEl) {
      console.log(this.draggableEl.style.cssText);
      console.log(this.childDraggableEl.style.cssText);
      // this.childDraggableEl.style.width = event.pageX - 20 + 'px';
      if (event.pageX < 380) {
        this.draggableEl.style.width = 365 + 'px';
        this.childDraggableEl.style.width = 365 + 'px';
      }
    }
    this.draggableEl = null;
    this.childDraggableEl = null;
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
