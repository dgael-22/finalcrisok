import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
    groupedProducts: { [key: string]: any[] } = {};
    categories: string[] = [];
    products: any[] = [];

    constructor(private apiService: ApiService, private cartService: CartService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts() {
        this.apiService.getProducts().subscribe(
            (data) => {
                this.products = data;
                this.groupProducts();
            },
            (error) => {
                console.error('Error fetching products:', error);
            }
        );
    }

    groupProducts() {
        this.groupedProducts = this.products.reduce((acc: any, product: any) => {
            const category = product.category || 'General';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
        this.categories = Object.keys(this.groupedProducts);
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
    }
}
