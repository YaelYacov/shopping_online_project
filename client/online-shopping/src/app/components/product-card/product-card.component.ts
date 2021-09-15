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

  increaseOrDecreaseQnt = (type: boolean, ID: number, Qnt: number) => {
    Qnt = type ? (Qnt += 1) : Qnt == 1 ? 1 : (Qnt -= 1);
    Qnt == 1
      ? Qnt
      : this.prodInCartService._updateProdInCart(
          ID,
          Qnt,
          this.usersServiceService._Users.CartID
        );
    console.log('qnt', Qnt);
  };

  addToCart = (
    ProductID: number //
  ) => {
    // console.log('CArtIDddd', this.usersServiceService._Users.CartID);
    let isProdInCart: any;

    isProdInCart = this.prodInCartService._prodInCart.find(
      (prod) => prod.Product.ID == ProductID
    );
    // console.log(
    //   'isProdInCart',
    //   isProdInCart,
    //   ProductID,
    //   isProdInCart.Qnt,
    //   isProdInCart.ID
    // );

    isProdInCart?.ID > 0
      ? this.increaseOrDecreaseQnt(true, isProdInCart.ID, isProdInCart.Qnt)
      : this.prodInCartService._addNewProdInCart(
          this.usersServiceService._Users.CartID,
          ProductID
        );
  };

  ngOnInit(): void {}
}
