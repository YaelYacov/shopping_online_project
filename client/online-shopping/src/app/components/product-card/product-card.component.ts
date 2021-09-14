import { Component, OnInit, Input } from '@angular/core';
import { ProdInCart } from 'src/app/models/prodInCartModel';
import { Product } from 'src/app/models/productsModel';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';

import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  // @Input() product:

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {
    if (this.productsService._products.length == 0) {
      this.productsService._getAllProducts();
      console.log(this.productsService._products);
    }
    // this.prodInCartService._getProdInCartByCartID(
    //   this.usersServiceService._Users.CartID
    // );
    // this.prodInCartService._getProdInCartByCartID(
    //   this.usersServiceService._Users.CartID
    // );
    // console.log(this.prodInCartService._prodInCart);
  }

  @Input() Product: Product = new Product();
  @Input() ProdInCart: ProdInCart = new ProdInCart();
  @Input() ProdType: boolean = true;

  addToCart = () => {};

  increaseOrDecreaseQnt = (
    type: boolean,
    ID: number,
    Qnt: number,
    CartID: number
  ) => {
    Qnt = type ? (Qnt += 1) : Qnt == 1 ? 1 : (Qnt -= 1);
    Qnt == 1
      ? (Qnt = 1)
      : this.prodInCartService._updateProdInCart(ID, Qnt, CartID);
    console.log(Qnt);
  };
  ngOnInit(): void {}
}
