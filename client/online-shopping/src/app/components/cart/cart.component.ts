import { Component, Input, OnInit } from '@angular/core';
import { ProdInCart } from 'src/app/models/prodInCartModel';
import { CartsService } from 'src/app/services/carts.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // @Input() Product: Product = new Product();

  constructor(
    public usersServiceService: UsersServiceService,
    public cartsService: CartsService,
    public prodInCartService: ProdInCartService
  ) {
    this.prodInCartService._getProdInCartByCartID(
      this.usersServiceService._Users.CartID
    );
    this.prodInCartService._calcTotalPrice();
  }

  ngOnInit(): void {}
}
