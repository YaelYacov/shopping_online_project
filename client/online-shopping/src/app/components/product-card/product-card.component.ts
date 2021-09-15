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

  isProdInCart = (ProductID: number) => {
    let IsProdInCart: any;
    IsProdInCart = this.prodInCartService._prodInCart.find(
      (prod) => prod.Product.ID == ProductID
    );
    return IsProdInCart;
  };

  increaseOrDecreaseQnt = (
    type: boolean,
    ProductID: number,
    qnt: number,
    prodInCurtID: number
  ) => {
    let Qnt = ProductID > 0 ? this.isProdInCart(ProductID).Qnt : qnt;

    let ProdInCartID =
      prodInCurtID > 0 ? prodInCurtID : this.isProdInCart(ProductID).ID;
    Qnt = type ? (Qnt += 1) : Qnt == 1 ? 1 : (Qnt -= 1);
    Qnt == 1
      ? Qnt
      : this.prodInCartService._updateProdInCart(
          ProdInCartID,
          Qnt,
          this.usersServiceService._Users.CartID
        );

    console.log('qnt', qnt, Qnt, this.isProdInCart(ProductID), ProductID);
  };

  addToCart = (
    ProductID: number //
  ) => {
    this.isProdInCart(ProductID).ID != 0
      ? this.increaseOrDecreaseQnt(
          true,
          ProductID,
          this.isProdInCart(ProductID).Qnt,
          this.isProdInCart(ProductID).ID
        )
      : this.prodInCartService._addNewProdInCart(
          this.usersServiceService._Users.CartID,
          ProductID
        );
  };

  ngOnInit(): void {}
}
