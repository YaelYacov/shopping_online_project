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

  constructor(
     public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {
    // console.log(this.prodInCartService._prodInCart);
    this.prodInCartService._getProdInCartByCartID(
      this.usersServiceService._Users.CartID
    );
  }

draggableEl: any;


 onMouseMove(event: MouseEvent) {
    if(this.draggableEl && event.pageX>288) {
      this.draggableEl.style.width = event.pageX + "px";      
      // console.log(event.pageX)
    }
  }

  onMouseUp(event: MouseEvent) {
    this.draggableEl = null;
  }

  // onMousDown(event: MouseEvent) {
  //   this.draggableEl = true
  // }

//     deleteAllProdsFromCart = () => {
// console.log(this.prodInCartService._prodInCart)
// this.prodInCartService._prodInCart.forEach(prod => this.prodInCartService._deleteProdInCart(prod.ID,  this.usersServiceService._Users.CartID))
//   }

  resizeCart = () =>{
 let cartRBorder: any;
    cartRBorder = document.getElementById("cartRBorder");
  }

  ngOnInit(): void {}
}
