import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-nav',
  templateUrl: './categories-nav.component.html',
  styleUrls: ['./categories-nav.component.css'],
})
export class CategoriesNavComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) {
    this.categoriesService._getAllCategories();
    this.productsService._getAllProducts();
  }

  prodSearch = (e:any) => {
    console.log()
  }

  ngOnInit(): void {}
}
