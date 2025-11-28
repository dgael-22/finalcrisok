// Importaciones necesarias para el componente
import { Component, OnInit } from '@angular/core'; // Decorador Component y ciclo de vida OnInit
import { Router } from '@angular/router'; // Servicio de navegación entre rutas
import { ApiService } from '../../services/api.service'; // Servicio para llamadas a la API backend
import { CartService } from '../../services/cart.service'; // Servicio para gestionar el carrito de compras

// Decorador que define el componente de Angular
@Component({
    selector: 'app-checkout', // Nombre del selector HTML
    templateUrl: './checkout.component.html', // Ruta al archivo de plantilla HTML
    styleUrls: ['./checkout.component.css'] // Ruta al archivo de estilos CSS
})
export class CheckoutComponent implements OnInit {
    // ID del usuario (hardcodeado para propósitos de demostración)
    userId = 1;

    // Array que almacena los productos del carrito
    cartItems: any[] = [];

    // Total del precio de todos los productos en el carrito
    total = 0;

    // Constructor que inyecta los servicios necesarios
    constructor(
        private apiService: ApiService, // Servicio para comunicarse con el backend
        private router: Router, // Servicio para navegar entre páginas
        private cartService: CartService // Servicio para gestionar el carrito
    ) { }

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Obtener los productos del carrito desde el servicio
        this.cartItems = this.cartService.getCartItems();
        // Calcular el total del carrito
        this.calculateTotal();
    }

    // Método que calcula el precio total de todos los productos en el carrito
    calculateTotal() {
        this.total = this.cartService.getTotal();
    }

    // Método que actualiza la cantidad de un producto cuando se cambia manualmente en el input
    updateQuantity(item: any, event: any) {
        // Convertir el valor del input a número entero
        const newQuantity = parseInt(event.target.value, 10);

        // Si la cantidad es mayor a 0, actualizar en el carrito
        if (newQuantity > 0) {
            this.cartService.updateQuantity(item.id, newQuantity);
        } else {
            // Si es 0 o menos, eliminar el producto del carrito
            this.removeFromCart(item);
        }

        // Recalcular el total después del cambio
        this.calculateTotal();
    }

    // Método que incrementa la cantidad de un producto en 1
    increaseQuantity(item: any) {
        // Aumentar la cantidad actual en 1
        this.cartService.updateQuantity(item.id, item.quantity + 1);
        // Recalcular el total
        this.calculateTotal();
    }

    // Método que disminuye la cantidad de un producto en 1
    decreaseQuantity(item: any) {
        // Si la cantidad es mayor a 1, disminuir en 1
        if (item.quantity > 1) {
            this.cartService.updateQuantity(item.id, item.quantity - 1);
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            this.removeFromCart(item);
        }

        // Recalcular el total
        this.calculateTotal();
    }

    // Método que elimina un producto del carrito
    removeFromCart(item: any) {
        // Mostrar mensaje de confirmación al usuario
        if (confirm('¿Estás segura de que quieres eliminar este artículo?')) {
            // Eliminar el producto del carrito usando el servicio
            this.cartService.removeFromCart(item.id);
            // Actualizar la lista local de productos
            this.cartItems = this.cartService.getCartItems();
            // Recalcular el total
            this.calculateTotal();
        }
    }

    // Método que procesa el pedido cuando el usuario confirma la compra
    onSubmit() {
        // Transformar los productos del carrito al formato esperado por el backend
        const mappedItems = this.cartItems.map(item => ({
            productId: item.id, // ID del producto
            quantity: item.quantity, // Cantidad a comprar
            price: item.price // Precio unitario del producto
        }));

        // Crear el objeto de datos del pedido
        const orderData = {
            userId: this.userId, // ID del usuario que realiza el pedido
            items: mappedItems, // Array de productos transformados
            total: this.total // Total del pedido
        };

        // Enviar el pedido al backend mediante la API
        this.apiService.createOrder(orderData).subscribe(
            // Callback de éxito: se ejecuta cuando el pedido se procesa correctamente
            (response) => {
                // Mostrar mensaje de confirmación con el ID del pedido
                alert('¡Pedido realizado con éxito! ID: ' + response.orderId);
                // Limpiar el carrito después de completar el pedido
                this.cartService.clearCart();
                // Limpiar la lista local de productos
                this.cartItems = [];
                // Resetear el total a 0
                this.total = 0;
                // Navegar a la página principal
                this.router.navigate(['/']);
            },
            // Callback de error: se ejecuta si ocurre un problema al procesar el pedido
            (error) => {
                // Mostrar el error en la consola para debugging
                console.error(error);
                // Extraer el mensaje de error del response o usar uno genérico
                const errorMessage = error.error && error.error.error ? error.error.error : 'Error al procesar el pedido.';
                // Mostrar mensaje de error al usuario
                alert('Error: ' + errorMessage);
            }
        );
    }
}
