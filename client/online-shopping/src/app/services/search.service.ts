import { Injectable } from '@angular/core';
import { ProdInCartService } from './prod-in-cart.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  _moreThanOne: boolean = false;

  _fn = (name: string) => {};

  constructor(public prodInCartService: ProdInCartService) {}
}
