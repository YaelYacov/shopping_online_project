import { Component, Input, OnInit } from '@angular/core';
// import { Product } from 'src/app/models/productsModel';
import { ProductsService } from 'src/app/services/products.service';

import { ProdInCartService } from 'src/app/services/prod-in-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @Input() product = ''; // decorate the property with @Input()

  constructor(
    public productsService: ProductsService,
    public prodInCartService: ProdInCartService
  ) {
    // console.log(this.prodInCartService._prodInCart);
  }

  ngOnInit(): void {}
}
