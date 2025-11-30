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
                console.error('Error fetching products, using mock data:', error);
                this.products = [
                    {
                        id: 1,
                        name: 'Vestido de Noche Elegante',
                        description: 'Vestido largo negro con detalles en encaje, ideal para eventos formales.',
                        price: 120.00,
                        image_url: 'assets/vestido-noche.jpg',
                        category: 'Fiesta',
                        stock: 10
                    },
                    {
                        id: 2,
                        name: 'Vestido Cóctel Rojo',
                        description: 'Vestido corto rojo vibrante, perfecto para fiestas de cóctel.',
                        price: 85.50,
                        image_url: 'assets/vestido-coctel.jpg',
                        category: 'Cóctel',
                        stock: 15
                    },
                    {
                        id: 3,
                        name: 'Vestido de Verano Floral',
                        description: 'Vestido ligero con estampado floral, fresco para el verano.',
                        price: 45.00,
                        image_url: 'assets/vestido-verano.jpg',
                        category: 'Casual',
                        stock: 20
                    },
                    {
                        id: 4,
                        name: 'Vestido de Gala Azul',
                        description: 'Impresionante vestido azul rey con falda amplia.',
                        price: 150.00,
                        image_url: 'assets/vestido-gala.jpg',
                        category: 'Gala',
                        stock: 5
                    },
                    {
                        id: 5,
                        name: 'Vestido Boho Chic',
                        description: 'Estilo bohemio con bordados y tela suave.',
                        price: 60.00,
                        image_url: 'assets/vestido-boho.jpg',
                        category: 'Casual',
                        stock: 12
                    },
                    {
                        id: 6,
                        name: 'Vestido de Novia Sencillo',
                        description: 'Elegancia minimalista para tu día especial.',
                        price: 350.00,
                        image_url: 'assets/vestido-novia.jpg',
                        category: 'Novia',
                        stock: 3
                    }
                ];
                this.groupProducts();
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
