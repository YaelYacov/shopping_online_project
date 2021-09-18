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
    }
    if (this.prodInCartService._prodInCart.length == 0) {
      this.prodInCartService._getProdInCartByCartID(
        this.usersServiceService._Users.CartID
      );
    }
  }

  // Get the modal

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
      // console.log(IsProdInCart, ProductID);
      return IsProdInCart;
    } else {
      return 0;
    }
  };

  increaseOrDecreaseQnt = (
    type: boolean,
    ProductID: number,
    qnt: number,
    prodInCartID: number
  ) => {
    // console.log(this.prodInCartService._prodInCart);
    // console.log(type, ProductID, qnt, prodInCartID);

    if (prodInCartID == 0 && this.isProdInCart(ProductID) == undefined) {
      this.prodInCartService._addNewProdInCart( this.usersServiceService._Users.CartID,ProductID )
    }else{

      let ProdInCartID =
        prodInCartID > 0 ? prodInCartID : this.isProdInCart(ProductID).ID;
      let Qnt = ProductID > 0 ? this.isProdInCart(ProductID).Qnt : qnt;
  
      Qnt = !type ? Qnt - 1 : Qnt + 1;
  
  
  
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
    }
  //   console.log(this.isProdInCart(ProductID), prodInCartID > 0);
  };

  addToCart = (
    ProductID: number //
  ) => {
    console.log(this.isProdInCart(ProductID))
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
