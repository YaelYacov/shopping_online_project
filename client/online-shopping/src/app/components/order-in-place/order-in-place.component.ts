import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartsService } from 'src/app/services/carts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-in-place',
  templateUrl: './order-in-place.component.html',
  styleUrls: ['./order-in-place.component.css'],
})
export class OrderInPlaceComponent implements OnInit {
  downloadJsonHref: any;
  Rcp: string = '';

  constructor(
    public prodInCartService: ProdInCartService,
    public usersServiceService: UsersServiceService,
    public ordersService: OrdersService,
    private sanitizer: DomSanitizer,
    public cartsService: CartsService,
    private router: Router
  ) {
    if (!this.usersServiceService._Users) this.router.navigateByUrl('/logIn');

    this.prodInCartService._getProdInCartByCartID(
      this.usersServiceService._Users.ID
    );
  }

  generateDownloadJsonUri = () => {
    let theJSON = this.ordersService.Rcp;

    var uri = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
    );
    this.downloadJsonHref = uri;
  };

  ngOnInit(): void {}
}
