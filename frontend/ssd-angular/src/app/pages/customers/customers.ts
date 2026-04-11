import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Customer } from '../../models/customer';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './customers.html',
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
      }

      table {
        width: 100%;
      }

      .mat-mdc-cell,
      .mat-mdc-header-cell {
        text-align: right;
      }

      tr.customer-row {
        cursor: pointer;
      }
    `,
  ],
})
export class Customers implements OnInit {
  private readonly customersService = inject(CustomersService);

  readonly customers = signal<Customer[]>([]);
  readonly displayedColumns = ['phone', 'name', 'brokerage', 'email'];

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe((customers) => {
      this.customers.set(customers);
    });
  }
}
