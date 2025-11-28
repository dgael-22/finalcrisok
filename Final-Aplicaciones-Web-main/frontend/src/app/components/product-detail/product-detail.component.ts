
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    productId: number | null = null;
    product: any = null;

    selectedSize: string = '';
    sizes: string[] = [];

    constructor(private route: ActivatedRoute, private apiService: ApiService, private cartService: CartService) { }

    ngOnInit(): void {
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        this.apiService.getProducts().subscribe(
            (products) => {
                this.product = products.find((p: any) => p.id === this.productId);
                if (this.product && this.product.sizes) {
                    this.sizes = this.product.sizes.split(',').map((s: string) => s.trim());
                }
            },
            (error) => {
                console.error('Error fetching product details:', error);
            }
        );
    }

    selectSize(size: string) {
        this.selectedSize = size;
    }

    addToCart(): void {
        if (this.product) {
            if (this.sizes.length > 0 && !this.selectedSize) {
                alert('Por favor, selecciona una talla.');
                return;
            }
            const productToAdd = { ...this.product, selectedSize: this.selectedSize };
            this.cartService.addToCart(productToAdd);
        }
    }
}


