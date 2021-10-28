import { Injectable } from '@angular/core';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
@Injectable({
  providedIn: 'root',
})
export class PlusMinusIconsService {
  costumedQnt: number = 0;

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {}

  popUpFN = () => {
    const costumedStr = prompt('Please enter quantity');
    if (costumedStr != null) {
      const costumedNum = Number(costumedStr);
      console.log(costumedNum);
      // debugger;
      this.costumedQnt = costumedNum;
    }
  };

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

  //type : 0 = -, 1 = +, 2 = PopUp
  increaseOrDecreaseQnt = async (
    ProductID: number,
    qnt: number,
    prodInCartID: number,
    price: number,
    type: number
  ) => {
    if (
      (prodInCartID == 0 && this.isProdInCart(ProductID) == undefined) ||
      (prodInCartID == 0 && this.isProdInCart(ProductID) == 0)
    ) {
      if (type == 2) {
        this.popUpFN();
        await this.prodInCartService._addNewProdInCart({
          CartID: this.usersServiceService._Users.CartID,
          ProductID: ProductID,
          Qnt: this.costumedQnt,
          TotalPrice: price,
        });
      } else if (type == 1) {
        await this.prodInCartService._addNewProdInCart({
          CartID: this.usersServiceService._Users.CartID,
          ProductID: ProductID,
          TotalPrice: price,
        });
      }
    } else {
      let ProdInCartID =
        prodInCartID > 0 ? prodInCartID : this.isProdInCart(ProductID).ID;
      let Qnt = ProductID > 0 ? this.isProdInCart(ProductID).Qnt : qnt;

      if (type == 0) Qnt -= 1;
      else if (type == 1) Qnt += 1;
      else {
        this.popUpFN();
        Qnt = this.costumedQnt;
      }
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
