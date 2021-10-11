import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Product } from 'src/app/models/productsModel';
import { CategoriesService } from 'src/app/services/categories.service';
// import { FormControl } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  @Input() Product: Product = new Product();
  newCat: boolean = false;
  // firstNameControl = new FormControl();
  Name: string = '';
  description: string = '';
  Price: number = 0;
  CategoryID: number = 0;
  editProd: any = {};

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) {
    // this.categoriesService._getAllCategories();
    // this.categoriesService._categories[0].Name;
  }

  IsNewCat = () => (this.newCat = !this.newCat ? true : false);

  saveChangesBTN = (isEditing: boolean) => {
    // isEditing ? this.productsService._editProd({})

    if (!isEditing) {
      this.productsService._addNewProd({
        Name: this.productsService._product.Name,
        description: this.productsService._product.description,
        Price: this.productsService._product.Price,
        Img: this.productsService._product.Img,
        CategoryID: this.productsService._product.CategoryID,
      });
    } else {
      if (this.productsService.Name != '')
        this.editProd.Name = this.productsService.Name;
      if (this.productsService.description != '')
        this.editProd.description = this.productsService.description;
      if (this.productsService.Price != 0)
        this.editProd.Price = this.productsService.Price;
      if (this.productsService.CategoryID != 0)
        this.editProd.CategoryID = this.productsService.CategoryID;
      this.productsService._editProd(
        this.productsService._currentProdId,
        this.editProd
      );
      console.log(this.productsService.CategoryID, this.productsService.Name);
    }
    this.productsService._product = new Product();
  };
  ngOnInit(): void {}
}
