import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
    orders: any[] = [];
    userId = 1; // hardcoded for demo

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getOrders(this.userId).subscribe(
            (data: any[]) => {
                this.orders = data;
            },
            (error: any) => {
                console.error('Error fetching orders:', error);
            }
        );
    }
}
