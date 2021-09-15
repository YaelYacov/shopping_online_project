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
    if (this.prodInCartService._prodInCart.length == 0) {
      this.prodInCartService._getProdInCartByCartID(
        this.usersServiceService._Users.CartID
      );

      console.log('PRODINCART', this.prodInCartService._prodInCart);
    }
    console.log(this.usersServiceService._Users.CartID);
  }

  @Input() Product: Product = new Product();
  @Input() ProdInCart: ProdInCart = new ProdInCart();
  @Input() ProdType: boolean = true;
  // totalPrice: number = 0

  addToCart = (
    ProductID: number, //
    Qnt: number, //
    ProdInCartID: number,
    Price: number
  ) => {
    console.log('CArtIDddd', this.usersServiceService._Users.CartID);
    let isProdInCart = this.prodInCartService._prodInCart.findIndex(
      (prod) => prod.Product.ID == ProductID
    );
    console.log('isProdInCart', isProdInCart);

    isProdInCart >= 1
      ? this.increaseOrDecreaseQnt(true, ProdInCartID, Qnt, Price)
      : this.prodInCartService._addNewProdInCart(
          this.usersServiceService._Users.CartID,
          ProductID
        );
  };

  increaseOrDecreaseQnt = (
    type: boolean,
    ID: number,
    Qnt: number,
    Price: number
  ) => {
    Qnt = type ? (Qnt += 1) : Qnt == 1 ? 1 : (Qnt -= 1);
    Qnt == 1
      ? (Qnt = 1)
      : this.prodInCartService._updateProdInCart(
          ID,
          Qnt,
          this.usersServiceService._Users.CartID
        );
    console.log('qnt', Qnt);
    // this.calcTotalPrice(Qnt, Price);
  };

  ngOnInit(): void {}
}
