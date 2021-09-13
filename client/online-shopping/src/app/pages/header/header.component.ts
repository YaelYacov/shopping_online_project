import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @Input('isRegister') isRegister: boolean = false;

  constructor(
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public usersServiceService: UsersServiceService,
    private router: Router,
    public settingsService: SettingsService
  ) {
    this.productsService._getAllProducts();

    // console.log(usersServiceService._currentUserID);
    // console.log(this.router.url);
  }

  ngOnInit(): void {}
}
