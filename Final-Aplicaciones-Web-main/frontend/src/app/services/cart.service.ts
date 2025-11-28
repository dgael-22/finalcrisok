import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<any[]>([]);
    cartItems$ = this.cartItems.asObservable();

    addToCart(product: any) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentItems.push({ ...product, quantity: 1 });
        }
        this.cartItems.next([...currentItems]);
        console.log('Cart updated:', this.cartItems.value);
        alert('¡Producto agregado al carrito!');
    }

    updateQuantity(productId: number, quantity: number) {
        const currentItems = this.cartItems.value;
        const item = currentItems.find(i => i.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
                return;
            }
            this.cartItems.next([...currentItems]);
        }
    }

    removeFromCart(productId: number) {
        const currentItems = this.cartItems.value;
        const updatedItems = currentItems.filter(item => item.id !== productId);
        this.cartItems.next(updatedItems);
    }

    getCartItems() {
        return this.cartItems.value;
    }

    clearCart() {
        this.cartItems.next([]);
    }

    getTotal() {
        return this.cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }
}
