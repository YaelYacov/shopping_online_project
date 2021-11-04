import { Injectable } from '@angular/core';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
@Injectable({
  providedIn: 'root',
})
export class PlusMinusIconsService {
  costumedQnt: number | any = 0;

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {}

  popUpFN = (ProductID: number) => {
    const costumedStr = prompt('Please enter quantity');
    if (costumedStr !== null) {
      const costumedNum = Number(costumedStr);
      this.costumedQnt = costumedNum;
    } else
      this.costumedQnt =
        this.isProdInCart(ProductID) == undefined
          ? 0
          : this.isProdInCart(ProductID).Qnt;
  };

  isProdInCart = (ProductID: number) => {
    let IsProdInCart: any;
    if (this.prodInCartService._prodInCart.length > 0) {
      IsProdInCart = this.prodInCartService._prodInCart.find(
        (prod) => prod.Product.ID == ProductID || prod.ID == ProductID
      );
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
    let prodID = ProductID == 0 ? prodInCartID : ProductID;
    if (
      (prodInCartID == 0 && this.isProdInCart(prodID) == undefined) ||
      (prodInCartID == 0 && this.isProdInCart(prodID) == 0)
    ) {
      if (type == 2) {
        this.popUpFN(prodID);
        if (this.costumedQnt > 0) {
          await this.prodInCartService._addNewProdInCart({
            CartID: this.usersServiceService._Users.CartID,
            ProductID: ProductID,
            Qnt: this.costumedQnt,
            TotalPrice: price,
          });
        }
      } else if (type == 1) {
        await this.prodInCartService._addNewProdInCart({
          CartID: this.usersServiceService._Users.CartID,
          ProductID: ProductID,
          TotalPrice: price,
        });
      }
    } else {
      let ProdInCartID =
        prodInCartID > 0 ? prodInCartID : this.isProdInCart(prodID).ID;
      let Qnt = ProductID > 0 ? this.isProdInCart(prodID).Qnt : qnt;

      if (type == 0) Qnt -= 1;
      else if (type == 1) Qnt += 1;
      else {
        this.popUpFN(prodID);
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
