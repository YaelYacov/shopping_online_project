import { Injectable } from '@angular/core';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
@Injectable({
  providedIn: 'root',
})
export class PlusMinusIconsService {
  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {}

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
    prodInCartID: number,
    price: number
  ) => {
    if (
      (prodInCartID == 0 && this.isProdInCart(ProductID) == undefined) ||
      (prodInCartID == 0 && this.isProdInCart(ProductID) == 0)
    ) {
      this.prodInCartService._addNewProdInCart(
        this.usersServiceService._Users.CartID,
        ProductID,
        price
      );
    } else {
      let ProdInCartID =
        prodInCartID > 0 ? prodInCartID : this.isProdInCart(ProductID).ID;
      let Qnt = ProductID > 0 ? this.isProdInCart(ProductID).Qnt : qnt;

      Qnt = !type ? Qnt - 1 : Qnt + 1;

      Qnt == 0
        ? this.prodInCartService._deleteProdInCart(
            ProdInCartID,
            this.usersServiceService._Users.CartID
          )
        : this.prodInCartService._updateProdInCart(
            ProdInCartID,
            { Qnt: Qnt, TotalPrice: Qnt * price },
            this.usersServiceService._Users.CartID
          );
    }
  };
}
