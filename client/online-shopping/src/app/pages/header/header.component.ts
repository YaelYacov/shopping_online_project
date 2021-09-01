import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public usersServiceService: UsersServiceService
  ) {
    console.log(usersServiceService._currentUserID);
  }

  ngOnInit(): void {}
}
