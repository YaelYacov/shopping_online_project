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
  newImgName: string = '';
  @Input() Product: Product = new Product();

  constructor(
    public apiService: ApiService,
    public productsService: ProductsService
  ) {}

  fileChangeEvent = (fileInput: any) => {
    this.filesToUpload = fileInput.target.files;
    console.log(this.filesToUpload);
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
    // console.log(res[0].originalname);
    let endOfImageName = res
      ? res.map((result: any) => `${result.originalname.substr(-4)}`)[0]
      : alert('some went wrong!, Please reload the page');
    // console.log(`http://www.localhost:5000/${res[0].originalname}`);
    console.log(res);
    if (!res[0].originalname) alert('error load image, please reload');
    else if (
      endOfImageName == '.png' ||
      endOfImageName == '.jpg' ||
      endOfImageName == 'jpeg' ||
      endOfImageName == '.gif'
    ) {
      //   if (this.test) {
      console.log(`http://www.localhost:5000/${res[0].originalname}`);
      this.productsService._editProd(this.Product.ID, {
        Img: `http://www.localhost:5000/${res[0].originalname}`,
      });
      this.productsService._getAllProducts();
      // this.

      ////////

      //   let getAllVacations = await GetAllVacations.getData();
      //   if (getAllVacations) {
      //     this.props.updateVacations([...getAllVacations.data]);
      //   }
      // } else {
      //   console.log('else');
      //   this.props.updateNewImgName(
      //     `http://www.localhost:5292/${res.data[0].filename}`
      //   );
      ////
    }
    // }
  };
  ngOnInit(): void {}
}
