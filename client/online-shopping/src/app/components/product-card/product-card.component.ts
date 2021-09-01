import { Component, OnInit, Input } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  // @Input() product:
  constructor(public productsService: ProductsService) {
    this.productsService._getAllProducts();
    // console.log(this.productsService._products);
  }

  ngOnInit(): void {}
}
