import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Order } from '../models/order';

interface OrdersResponse {
  orders: Order[];
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this.http
      .get<OrdersResponse>('/api/orders')
      .pipe(map((res) => res.orders ?? []));
  }
}
