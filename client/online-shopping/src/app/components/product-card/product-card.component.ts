import { Component, OnInit, Input } from '@angular/core';
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
    // this.prodInCartService._getProdInCartByCartID(
    //   this.usersServiceService._Users.CartID
    // );
    // console.log(this.productsService._products);
    console.log(this.prodInCartService._prodInCart);
  }
  @Input() Product: Product = new Product();

  addToCart = () => {};

  ngOnInit(): void {}
}
