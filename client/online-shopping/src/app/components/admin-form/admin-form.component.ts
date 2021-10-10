import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Product } from 'src/app/models/productsModel';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormControl } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  @Input() Product: Product = new Product();
  newCat: boolean = false;
  firstNameControl = new FormControl();
  Name: string = '';
  description: string = '';
  Price: number = 0;
  CategoryID: number = 0;

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) {
    // this.categoriesService._getAllCategories();
    // this.categoriesService._categories[0].Name;
  }

  IsNewCat = () => {
    this.newCat = !this.newCat ? true : false;
    console.log(this.newCat);
  };

  // defaultValues = () => {
  //   return this.productsService._products.find(
  //     (prod) => prod.ID === this.productsService._currentProdId
  //   );
  // };

  defaultValues = () => {
    let foundProd: any = this.productsService._products.find(
      (prod) => prod.ID === this.productsService._currentProdId
    );
    if (this.productsService._isAdding) {
      this.Name = '';
      this.description = '';
      this.Price = 0;
      this.CategoryID = 0;
    } else {
      this.Name = foundProd?.Name;
      this.description = foundProd?.description;
      this.Price = foundProd?.Price;
      this.CategoryID = foundProd?.CategoryID;
    }
  };

  saveChangesBTN = () => {
    // .create({ Name: req.body.Name, Price: req.body.Price, CategoryID: req.body.CategoryID })
    this.productsService._addNewProd({
      Name: this.productsService._product.Name,
      description: this.productsService._product.description,
      Price: this.productsService._product.Price,
      Img: this.productsService._product.Img,
      CategoryID: this.productsService._product.CategoryID,
    });
  };
  ngOnInit(): void {
    // this.defaultValues.

    this.defaultValues();
    // if (this.productsService._isAdding) {
    //   this.Name = '';
    // } else {
    //   this.defaultValues()?.Name;
    // }

    // if (this.productsService._isAdding) {
    //   null;
    // } else {
    //   this.defaultValues()?.Name;
    //   this.defaultValues()?.description;
    //   this.defaultValues()?.Price;
    // }
  }
}
