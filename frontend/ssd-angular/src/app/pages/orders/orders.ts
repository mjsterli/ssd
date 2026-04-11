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
        padding: 16px;
      }

      .orders-container {
        height: 700px;
        display: flex;
        flex-direction: column;
      }

      table {
        width: 100%;
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
