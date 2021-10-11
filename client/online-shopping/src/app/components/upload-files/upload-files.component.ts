import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/productsModel';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
})
export class UploadFilesComponent implements OnInit {
  filesToUpload: any;
  test: boolean = true;
  @Input() Product: Product = new Product();
  // @Input() isAdding: boolean = false;

  constructor(
    public apiService: ApiService,
    public productsService: ProductsService
  ) {}

  fileChangeEvent = async (fileInput: any) => {
    this.filesToUpload = fileInput.target.files;
    // console.log(this.filesToUpload);
  };

  uploadFile = async () => {
    // console.log(this.Product);
    let res: any;
    const formData = new FormData();
    const files = this.filesToUpload;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i]['name']);
      }
    }
    res = await this.apiService.createPostService('upload', formData);
    let endOfImageName = res
      ? res.map((result: any) => `${result.originalname.substr(-4)}`)[0]
      : alert('some went wrong!, Please reload the page');

    if (!res[0].originalname) alert('error load image, please reload');
    else if (
      endOfImageName == '.png' ||
      endOfImageName == '.jpg' ||
      endOfImageName == 'jpeg' ||
      endOfImageName == '.gif'
    ) {
      // console.log(`http://www.localhost:5000/${res[0].originalname}`);
      if (this.productsService._isAdding)
        this.productsService._product.Img = `http://www.localhost:5000/${res[0].originalname}`;
      else {
        this.productsService._editProd(this.Product.ID, {
          Img: `http://www.localhost:5000/${res[0].originalname}`,
        });
        this.productsService._getAllProducts();
      }
    }
  };
  ngOnInit(): void {}
}
