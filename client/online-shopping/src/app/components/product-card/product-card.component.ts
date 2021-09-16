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
    if (this.prodInCartService._prodInCart.length > 0) {
      IsProdInCart = this.prodInCartService._prodInCart.find(
        (prod) => prod.Product.ID == ProductID
      );
      console.log(IsProdInCart);
      return IsProdInCart;
    } else {
      return 0;
    }
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
    Qnt = !type ? Qnt - 1 : Qnt + 1;
    // Qnt = type ? (Qnt += 1) : Qnt == -1 ? 0 : (Qnt -= 1);
    // console.log('Qnt', Qnt == 0, 'ProdInCartID', ProdInCartID);

    Qnt == 0
      ? this.prodInCartService._updateProdInCart(
          ProdInCartID,
          { Deleted: 0 },
          this.usersServiceService._Users.CartID
        )
      : this.prodInCartService._updateProdInCart(
          ProdInCartID,
          { Qnt: Qnt },
          this.usersServiceService._Users.CartID
        );

    // console.log('qnt', qnt, this.isProdInCart(ProductID), ProductID);
  };
  //FixMe: prodInCart array is not exist
  addToCart = (
    ProductID: number //
  ) => {
    console.log(
      this.isProdInCart(ProductID),
      'ProductID',
      ProductID,
      ' this.usersServiceService._Users.CartID,',
      this.usersServiceService._Users.CartID
    );
    this.isProdInCart(ProductID) == 0 ||
    this.prodInCartService._prodInCart.length == 0 ||
    this.isProdInCart(ProductID) == undefined
      ? this.prodInCartService._addNewProdInCart(
          this.usersServiceService._Users.CartID,
          ProductID
        )
      : this.increaseOrDecreaseQnt(
          true,
          ProductID,
          this.isProdInCart(ProductID).Qnt,
          this.isProdInCart(ProductID).ID
        );
  };

  ngOnInit(): void {}
}
