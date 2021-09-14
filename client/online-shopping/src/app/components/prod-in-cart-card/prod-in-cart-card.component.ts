import { Component, Input, OnInit } from '@angular/core';
import { ProdInCart } from 'src/app/models/prodInCartModel';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';

@Component({
  selector: 'app-prod-in-cart-card',
  templateUrl: './prod-in-cart-card.component.html',
  styleUrls: ['./prod-in-cart-card.component.css'],
})
export class ProdInCartCardComponent implements OnInit {
  constructor(public prodInCartService: ProdInCartService) {
    console.log(this.prodInCartService._prodInCart);
  }
  @Input() ProdInCart: ProdInCart = new ProdInCart();

  ngOnInit(): void {}
}
