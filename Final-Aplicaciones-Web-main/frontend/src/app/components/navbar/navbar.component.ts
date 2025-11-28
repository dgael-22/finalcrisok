import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    cartItemCount = 0;

    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
        });
    }
}
