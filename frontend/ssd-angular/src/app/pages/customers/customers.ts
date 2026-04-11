import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Customer } from '../../models/customer';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './customers.html',
  styles: [
    `
      :host {
        display: block;
      }

      .page-header {
        margin-bottom: 20px;
      }

      .page-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #111827;
        margin: 0 0 4px;
      }

      .page-subtitle {
        font-size: 0.9rem;
        color: #6b7280;
        margin: 0;
      }

      .card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      table {
        width: 100%;
      }

      ::ng-deep .mat-mdc-header-row {
        background: #f9fafb;
      }

      ::ng-deep .mat-mdc-header-cell {
        color: #374151;
        font-weight: 600;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      ::ng-deep .mat-mdc-cell {
        color: #1f2937;
        font-size: 0.92rem;
      }

      ::ng-deep .mat-mdc-row {
        transition: background 0.15s ease;
      }

      ::ng-deep .mat-mdc-row:hover {
        background: rgba(0, 153, 25, 0.06);
        cursor: pointer;
      }

      ::ng-deep .mat-mdc-row:nth-child(even) {
        background: #fafafa;
      }

      ::ng-deep .mat-mdc-row:nth-child(even):hover {
        background: rgba(0, 153, 25, 0.08);
      }

      ::ng-deep .mat-mdc-paginator {
        border-top: 1px solid #e5e7eb;
        background: #ffffff;
      }
    `,
  ],
})
export class Customers implements OnInit, AfterViewInit {
  private readonly customersService = inject(CustomersService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dataSource = new MatTableDataSource<Customer>([]);
  readonly displayedColumns = ['phone', 'name', 'brokerage', 'email'];

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe((customers) => {
      this.dataSource.data = customers;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
