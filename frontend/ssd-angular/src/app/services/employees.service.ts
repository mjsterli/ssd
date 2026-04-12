import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Employee } from '../models/employee';
import { RequestService } from '../models/service';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private readonly http = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<{ data: Employee[] }>('/api/employees')
      .pipe(map((res) => res.data ?? []));
  }

  fulfillOrder(orderId: string, employeeId: string, fulfilledAt?: string): Observable<unknown> {
    return this.http.post(`/api/order/${encodeURIComponent(orderId)}/fulfill`, {
      employeeId,
      fulfilledAt,
    });
  }

  removeOrder(orderId: string, employeeId: string, removedAt?: string): Observable<unknown> {
    return this.http.post(`/api/order/${encodeURIComponent(orderId)}/remove`, {
      employeeId,
      removedAt,
    });
  }

  getServices(): Observable<RequestService[]> {
    return this.http
      .get<{ services: RequestService[] }>('/api/services')
      .pipe(map((r) => r.services));
  }

  updateOrder(orderId: string, fields: Record<string, unknown>): Observable<unknown> {
    return this.http.patch(`/api/order/${encodeURIComponent(orderId)}`, fields);
  }
}
