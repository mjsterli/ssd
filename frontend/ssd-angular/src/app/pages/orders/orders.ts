import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule, DatePipe],
  templateUrl: './orders.html',
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

      :host ::ng-deep .mat-mdc-checkbox .mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
      :host ::ng-deep .mat-mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
        background-color: var(--ssd-primary) !important;
        border-color: var(--ssd-primary) !important;
      }

      :host ::ng-deep .mat-mdc-checkbox .mdc-checkbox__checkmark {
        color: #ffffff !important;
      }

      :host ::ng-deep .mat-mdc-checkbox .mdc-checkbox__mixedmark {
        border-color: #ffffff !important;
      }

      :host ::ng-deep .mat-mdc-checkbox .mdc-checkbox__ripple,
      :host ::ng-deep .mat-mdc-checkbox .mat-mdc-checkbox-ripple .mat-ripple-element {
        background-color: var(--ssd-primary) !important;
      }

      :host ::ng-deep .mat-mdc-checkbox.mat-mdc-checkbox-checked .mat-ripple-element,
      :host ::ng-deep .mat-mdc-checkbox .mdc-checkbox--selected .mdc-checkbox__ripple {
        background-color: var(--ssd-primary) !important;
      }

      /* ── Responsive ─────────────────────────────────── */
      @media (max-width: 900px) {
        .card {
          overflow-x: auto;
        }

        table {
          min-width: 620px;
        }
      }
    `,
  ],
})
export class Orders implements OnInit, AfterViewInit {
  private readonly ordersService = inject(OrdersService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dataSource = new MatTableDataSource<Order>([]);
  readonly selection = new SelectionModel<Order>(true, []);
  readonly displayedColumns = [
    'select',
    'orderId',
    'address',
    'county',
    'installDate',
    'service',
  ];

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((orders) => {
      this.dataSource.data = orders;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  toggleAll(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }
}
