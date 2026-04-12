import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Customer } from '../models/customer';

interface CustomersResponse {
  customers: Customer[];
}

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private readonly http = inject(HttpClient);

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<CustomersResponse>('/api/customers/orders')
      .pipe(map((res) => (res.customers ?? []).sort((a, b) => (b.Orders?.length ?? 0) - (a.Orders?.length ?? 0))));
  }
}
