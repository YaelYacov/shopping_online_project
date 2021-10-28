import { Component, OnInit, Input } from '@angular/core';
import { ProdInCart } from 'src/app/models/prodInCartModel';
import { Product } from 'src/app/models/productsModel';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { CartsService } from 'src/app/services/carts.service';
import { PlusMinusIconsService } from 'src/app/services/plus-minus-icons.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() Product: Product = new Product();
  @Input() ProdInCart: ProdInCart = new ProdInCart();
  @Input() ProdType: number = 1; //0= prodInCart, 1= product, 2= orders
  nameLenArr: Array<string> | any = [];
  searchArr: Array<any> = [];

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService,
    public cartsService: CartsService,
    public plusMinusIconsService: PlusMinusIconsService
  ) {
    this.usersServiceService._getUser();
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

  imgSrc = (type: number) => {
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
      this.productsService._product.Name = foundProd?.Name;
      this.productsService._product.description = foundProd?.description;
      this.productsService._product.Price = foundProd?.Price;
      this.productsService._product.CategoryID = foundProd?.CategoryID;
    }
    this.productsService._product.Name =
      this.productsService._currentProdId != prodID ? foundProd?.Name : '';
    this.productsService._currentProdId = prodID;
  };

  deleteAll = () => {
    this.prodInCartService.strArr.map(
      (item: { isSearched: boolean; isChangeable: boolean }) => {
        item.isSearched = false;
        item.isChangeable = true;
      }
    );
  };

  getName = (Name: string | any) => {
    let splittedSearch: Array<string> = [
      ...this.prodInCartService._prodInCartSearch.split(''),
    ];

    for (let i = 0; i < Name.length; i++) {
      if (this.nameLenArr.length < i + 1) {
        this.nameLenArr.push({
          letter: Name[i],
          isSearched: false,
          isChangeable: true,
          Idx: i,
        });
      }
    }
    this.prodInCartService.strArr = [...this.nameLenArr];

    if (
      splittedSearch.length > 0 &&
      this.searchArr.length < splittedSearch.length
    )
      this.searchArr.push({
        letter: splittedSearch[splittedSearch.length - 1],
        isUsed: false,
      });
    else if (this.searchArr.length > splittedSearch.length)
      this.searchArr.pop();

    if (this.prodInCartService._prodInCartSearch.length == 0) {
      this.deleteAll();
      this.searchArr = [];
    } else if (this.prodInCartService._prodInCartSearch.length > 0) {
      this.deleteAll();
      let idxOfSearchInName = Name.indexOf(
        this.prodInCartService._prodInCartSearch
      );
      if (idxOfSearchInName == -1) {
        this.deleteAll();
      } else if (idxOfSearchInName > -1) {
        for (let i = 0; i < this.searchArr.length; i++) {
          if (
            this.prodInCartService.strArr[idxOfSearchInName + i].letter ==
            this.searchArr[i].letter
          ) {
            this.prodInCartService.strArr[idxOfSearchInName + i].isSearched =
              true;
            this.prodInCartService.strArr[idxOfSearchInName + i].isChangeable =
              false;
            this.searchArr[i].isUsed = true;
          }
        }
      }
    }
  };

  ngOnInit(): void {}
}
