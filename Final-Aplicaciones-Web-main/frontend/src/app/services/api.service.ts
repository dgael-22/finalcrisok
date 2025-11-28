import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3001/api';

    constructor(private http: HttpClient) { }

    // GET: Get all products
    getProducts(): Observable<any> {
        return this.http.get(`${this.apiUrl}/products`);
    }

    // GET: Get orders by user ID
    getOrders(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/orders/${userId}`);
    }

    // POST: Register a new user
    registerUser(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/users/register`, userData);
    }

    // POST: Create a new order
    createOrder(orderData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/orders`, orderData);
    }
}
