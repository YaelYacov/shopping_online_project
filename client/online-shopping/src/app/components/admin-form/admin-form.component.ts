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
  editProd: any = {};

  constructor(
    public usersServiceService: UsersServiceService,
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) {
    this.categoriesService._getAllCategories();
  }

  IsNewCat = () => (this.newCat = !this.newCat ? true : false);

  // saveChangesBTN = (isEditing: boolean) => {
  //   if (this.productsService._product.Name == '') {
  //     alert('Please select product Name');
  //   } else if (this.productsService._product.Img == '') {
  //     alert('Please select product Image ');
  //   } else if (this.productsService._product.CategoryID == 0) {
  //     alert('Please select Category');
  //   } else if (this.productsService._product.Price == 0) {
  //     alert('Please select Price');
  //   } else {
  //     if (!isEditing) {
  //       let ob = {
  //         Name: this.productsService._product.Name,
  //         description: this.productsService._product.description,
  //         Price: this.productsService._product.Price,
  //         Img: this.productsService._product.Img,
  //         CategoryID: this.productsService._product.CategoryID,
  //       };
  //       this.productsService._addNewProd(ob);
  //       this.productsService._isAdding = false;
  //     } else {
  //       this.editProd.Name = this.productsService._product.Name;
  //       this.editProd.description = this.productsService._product.description;
  //       this.editProd.Price = this.productsService._product.Price;
  //       this.editProd.CategoryID = this.productsService._product.CategoryID;
  //       this.productsService._editProd(
  //         this.productsService._currentProdId,
  //         this.editProd
  //       );
  //       this.productsService._isEditing = false;
  //     }
  //   }
  // };

  saveChangesBTN = (isEditing: boolean) => {
    if (!isEditing) {
      this.productsService._addNewProd({
        Name: this.productsService._product.Name,
        description: this.productsService._product.description,
        Price: this.productsService._product.Price,
        Img: this.productsService._product.Img,
        CategoryID: this.productsService._product.CategoryID,
      });
      this.productsService._isAdding = false;
    } else {
      if (this.productsService._product.Name != '')
        this.editProd.Name = this.productsService._product.Name;
      else alert('Please fill in all the required fields');
      if (this.productsService._product.description != '')
        this.editProd.description = this.productsService._product.description;
      if (this.productsService._product.Price != 0)
        this.editProd.Price = this.productsService._product.Price;
      if (this.productsService._product.CategoryID != 0)
        this.editProd.CategoryID = this.productsService._product.CategoryID;
      this.productsService._editProd(
        this.productsService._currentProdId,
        this.editProd
      );
      this.productsService._isEditing = false;
    }
  };

  ngOnInit(): void {}
}
