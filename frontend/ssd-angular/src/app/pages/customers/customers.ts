import { AfterViewInit, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Customer } from '../../models/customer';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './customers.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
    ]),
  ],
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

      ::ng-deep .customer-row {
        transition: background 0.15s ease;
        cursor: pointer;
      }

      ::ng-deep .customer-row:hover {
        background: rgba(0, 153, 25, 0.06);
      }

      ::ng-deep .customer-row.expanded {
        background: rgba(0, 153, 25, 0.1);
      }

      ::ng-deep .customer-row.expanded .mat-mdc-cell {
        border-bottom-width: 0;
      }

      ::ng-deep .detail-row {
        height: 0;
      }

      ::ng-deep .detail-row .mat-mdc-cell {
        padding: 0;
        border-bottom-width: 0;
      }

      .expand-indicator {
        display: inline-block;
        margin-right: 8px;
        color: #6b7280;
        transition: transform 0.2s ease;
      }

      .customer-row.expanded .expand-indicator {
        transform: rotate(90deg);
        color: var(--ssd-primary);
      }

      .detail-wrapper {
        overflow: hidden;
        background: #f9fafb;
      }

      .detail-content {
        padding: 20px 32px;
      }

      .detail-heading {
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #6b7280;
        margin: 0 0 12px;
      }

      .orders-empty {
        color: #9ca3af;
        font-size: 0.9rem;
        font-style: italic;
        margin: 0;
      }

      .order-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .order-item {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr 0.8fr;
        gap: 16px;
        padding: 12px 16px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        align-items: center;
      }

      .order-field {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .order-label {
        font-size: 0.68rem;
        font-weight: 600;
        color: #9ca3af;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .order-value {
        font-size: 0.88rem;
        color: #1f2937;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .occupancy-badge {
        justify-self: start;
        padding: 3px 10px;
        background: rgba(0, 153, 25, 0.12);
        color: #065f13;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
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
  readonly expandedRow = signal<Customer | null>(null);

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe((customers) => {
      this.dataSource.data = customers;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  toggleRow(customer: Customer): void {
    this.expandedRow.set(this.expandedRow() === customer ? null : customer);
  }

  isExpanded(customer: Customer): boolean {
    return this.expandedRow() === customer;
  }
}
