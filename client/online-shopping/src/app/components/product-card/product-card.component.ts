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
  @Input() Product: Product = new Product();
  @Input() ProdInCart: ProdInCart = new ProdInCart();
  @Input() ProdType: number = 1; //0= prodInCart, 1= product, 2= orders
  // @Input() ProdType: boolean = true;

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {
    if (this.productsService._products.length == 0) {
      this.productsService._getAllProducts();
    }
    if (
      this.prodInCartService._prodInCart.length == 0 &&
      this.usersServiceService._Users
    ) {
      this.prodInCartService._getProdInCartByCartID(
        this.usersServiceService._Users.CartID
      );
    }
  }

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
    if (
      (prodInCartID == 0 && this.isProdInCart(ProductID) == undefined) ||
      (prodInCartID == 0 && this.isProdInCart(ProductID) == 0)
    ) {
      this.prodInCartService._addNewProdInCart(
        this.usersServiceService._Users.CartID,
        ProductID
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
            { Qnt: Qnt },
            this.usersServiceService._Users.CartID
          );
    }
    //   console.log(this.isProdInCart(ProductID), prodInCartID > 0);
  };

  addToCart = (
    ProductID: number //
  ) => {
    // console.log(this.isProdInCart(ProductID));
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

  imgSrc = (type: number) => {
    //type tru => product, false => prodInCart
    if (type == 1) {
      return this.Product.Img;
    } else if (type == 0 || type == 2) {
      return this.ProdInCart.Product.Img;
    } else {
      return 'https://res.feednews.com/assets/v2/bdcbeefd15297ea254af962c9093ba00?width=1280&height=720&quality=hq&category=us_Digital_Technology';
    }
  };

  editBTN = (prodID: number) => {
    this.productsService._editOrAddIcons(false, prodID);
    let foundProd: any = this.productsService._products.find(
      (prod) => prod.ID === prodID
    );
    if (this.productsService._currentProdId != prodID) {
      this.productsService.Name = foundProd?.Name;
      this.productsService.description = foundProd?.description;
      this.productsService.Price = foundProd?.Price;
      this.productsService.CategoryID = foundProd?.CategoryID;
    }
    this.productsService.Name =
      this.productsService._currentProdId != prodID ? foundProd?.Name : '';
    this.productsService._currentProdId = prodID;
  };

  returnName = (Name: string) => {
    // for (let i = 0; i < Name.length; i++) {
    this.prodInCartService.strArr.push({
      letter: Name.split(''),
      isSearched: false,
    });
    console.log(this.prodInCartService.strArr);
    // return;
  };

  ngOnInit(): void {}
}
