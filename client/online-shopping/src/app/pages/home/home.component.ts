import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/productsModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @Input() product = ''; // decorate the property with @Input()

  constructor(public productsService: ProductsService) {}

  ngOnInit(): void {}
}
