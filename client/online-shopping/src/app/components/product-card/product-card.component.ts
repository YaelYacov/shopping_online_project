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
  searchStr: string = '';
  prodNameStr: string = '';
  nameLenArr: Array<string> | any = [];
  secondaryProdNameArr: Array<any> = [];
  searchArr: Array<any> = [];

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

  deleteAll = () => {
    this.prodInCartService.strArr.map(
      (item: {
        letter: string;
        isSearched: boolean;
        isChangeable: boolean;
        Idx: number;
      }) => {
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

    for (let i = 0; i < splittedSearch.length; i++) {
      if (i > 0 || splittedSearch.length < i + 1)
        this.searchArr.push({
          letter: splittedSearch[splittedSearch.length - 1],
          isUsed: false,
        });
    }

    console.log(this.searchArr.length, this.searchArr);

    if (this.prodInCartService._prodInCartSearch.length > 0) {
      // console.log(splittedSearch.length, this.prodInCartService.strArr);

      // let samLettersInArr = this.prodInCartService.strArr.filter(
      //   (
      //     item: {
      //       letter: string;
      //       isSearched: boolean;
      //       isChangeable: boolean;
      //     },
      //     i: number
      //   ) =>
      //     item.letter ==
      //     this.prodInCartService._prodInCartSearch[
      //       this.prodInCartService._prodInCartSearch.length - 1
      //     ]
      // );
      // console.log(samLettersInArr);

      // let mappedFilter = [...this.prodInCartService.strArr];
      // mappedFilter.filter(
      //   (
      //     item: {
      //       letter: string;
      //       isSearched: boolean;
      //       isChangeable: boolean;
      //       Idx: number;
      //     },
      //     i: number
      //   ) => IdxOfSecLett > -1
      // );
      // console.log(mappedFilter);

      let markedArr = this.prodInCartService.strArr.filter(
        (item: { letter: string; isSearched: boolean }) =>
          item.isSearched == true
      );
      console.log(markedArr);

      let IdxOfSearchedInName = this.prodInCartService.strArr.findIndex(
        (
          item: {
            letter: string;
            isSearched: boolean;
            isChangeable: boolean;
            Idx: number;
          },
          i: number
        ) => {
          // console.log(i, item.Idx, item.letter);
          return (
            this.prodInCartService._prodInCartSearch[
              this.prodInCartService._prodInCartSearch.length - 1
            ] == item.letter &&
            item.isChangeable == true &&
            markedArr.length + 1 == splittedSearch.length
          );
        }
      );

      if (
        IdxOfSearchedInName > -1 &&
        this.prodInCartService.strArr[IdxOfSearchedInName].isChangeable == true
      ) {
        // if (markedArr.length == splittedSearch.length) {
        this.prodInCartService.strArr[IdxOfSearchedInName].isSearched = true;
        if (
          markedArr.length == splittedSearch.length ||
          markedArr.length == 0
        ) {
          this.prodInCartService.strArr.map(
            (
              item: {
                letter: string;
                isSearched: boolean;
                isChangeable: boolean;
              },
              i: number
            ) => {
              if (i < IdxOfSearchedInName + 1) item.isChangeable = false;

              // if(samLettersInArr.length >1 && samLettersInArr[0].letter == item.letter&& item.isSearched == true){
              //   item.isSearched = false;
              //   item.isChangeable = true
              // }
            }
          );
        }

        // }
      } else this.deleteAll();
    } else this.deleteAll();
  };

  // getName = (Name: string | any) => {
  //   //  this._moreThanOne;
  //   // console.log(
  //   //   this.prodInCartService._isLettInStrMulti(
  //   //     this.prodInCartService._prodInCartSearch,
  //   //     Name
  //   //   )
  //   // );

  //   let splittedSearch = [
  //     ...this.prodInCartService._prodInCartSearch.split(''),
  //   ];
  //   let splittedName = [...Name.split('')];
  //   for (let i = 0; i < Name.length; i++) {
  //     if (this.nameLenArr.length < i + 1) {
  //       this.nameLenArr.push({
  //         letter: Name[i],
  //         isSearched: false,
  //         isChangeable: true,
  //       });
  //     }
  //     this.prodInCartService.strArr = [...this.nameLenArr];

  //     let markedArr = this.prodInCartService.strArr.filter(
  //       (item: { letter: string; isSearched: boolean }) =>
  //         item.isSearched == true
  //     );

  //     this.prodInCartService.strArr.map(
  //       (item: { letter: string; isSearched: boolean }, index: number) => {
  //         if (splittedSearch.length == 0) item.isSearched = false; //everything is false
  //         for (let i = 0; i < splittedSearch.length; i++) {
  //           // console.log(item.letter == splittedSearch[i]);
  //           let idxOfFstLett = Name.indexOf(splittedSearch[i]);
  //           let IdxOfSecLett = Name.indexOf(
  //             splittedSearch[i],
  //             idxOfFstLett + 1
  //           );
  //           console.log(IdxOfSecLett, idxOfFstLett);
  //           let findSearchedIdx = this.prodInCartService.strArr.findIndex(
  //             (item: { letter: string; isSearched: boolean }) =>
  //               item.isSearched &&
  //               !this.prodInCartService._prodInCartSearch.includes(item.letter)
  //           ); //item.search true, but not on _prodInCartSearch

  //           if (IdxOfSecLett > -1) {
  //             /////////////////
  //             if (
  //               this.prodInCartService._isLettInStrMulti(
  //                 this.prodInCartService._prodInCartSearch,
  //                 Name
  //               )
  //             )
  //               this.prodInCartService.strArr[idxOfFstLett].isSearched = true;
  //             this.prodInCartService.strArr[IdxOfSecLett].isSearched = false;
  //           } else if (
  //             this.prodInCartService._prodInCartSearch.includes(item.letter) &&
  //             idxOfFstLett > -1 &&
  //             IdxOfSecLett == -1
  //           ) {
  //             item.isSearched = true;
  //             if (!Name.includes(this.prodInCartService._prodInCartSearch)) {
  //               let idx = this.prodInCartService.strArr.findIndex(
  //                 (item: { letter: string; isSearched: boolean }) =>
  //                   item.isSearched == true
  //               );
  //               this.prodInCartService.strArr[idx].isSearched = false;
  //             }
  //           }
  //           if (splittedSearch.length < markedArr.length) {
  //             // this.prodInCartService._ifLettInArrayMoreThanOnce(
  //             //   this.prodInCartService.strArr,
  //             //   Name
  //             // );
  //             if (findSearchedIdx > 0)
  //               this.prodInCartService.strArr[findSearchedIdx].isSearched =
  //                 false;
  //           }
  //         }
  //       }
  //     );
  //   }
  // };

  ngOnInit(): void {}
}
