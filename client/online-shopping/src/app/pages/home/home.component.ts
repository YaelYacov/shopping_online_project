import { Component, Input, OnInit } from '@angular/core';
// import { Product } from 'src/app/models/productsModel';
import { ProductsService } from 'src/app/services/products.service';

import { ProdInCartService } from 'src/app/services/prod-in-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @Input() product = ''; // decorate the property with @Input()

  constructor(
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {
    // console.log(this.prodInCartService._prodInCart);
  }

draggableEl: any;


 onMouseMove(event: MouseEvent) {
    if(this.draggableEl) {
      this.draggableEl.style.left = event.pageX + "px";
      console.log(event.pageX)
      console.log("onMouseMove")
      // this.draggableEl.style.top = event.pageY + "px";
    }
  }

  onMouseUp(event: MouseEvent) {
    this.draggableEl = null;
  }

  // onMousDown(event: MouseEvent) {
  //   this.draggableEl = true
  // }


  resizeCart = () =>{
 let cartRBorder: any;
    cartRBorder = document.getElementById("cartRBorder");
// cartRBorder.addEventListener("click", cartRBorder);

// function handleClick() {
//     console.log("Clicked!");
//     this.removeEventListener("click", handleClick);
// }

  }

  ngOnInit(): void {}
}
