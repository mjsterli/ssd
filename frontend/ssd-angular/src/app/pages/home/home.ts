import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardService } from '../../services/dashboard.service';
import { EmployeesService } from '../../services/employees.service';
import { DashboardData, DashboardOrder } from '../../models/dashboard';
import { Employee } from '../../models/employee';
import { RequestService } from '../../models/service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './home.html',
  styles: [
    `
      :host {
        display: block;
      }

      .page-header {
        margin-bottom: 24px;
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

      .dashboard-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .section-card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
        overflow: hidden;
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 20px;
        border-bottom: 1px solid #f3f4f6;
      }

      .section-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .dot-install { background: #f59e0b; }
      .dot-removal { background: #ef4444; }
      .dot-completed { background: #009919; }

      .section-title {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #374151;
        margin: 0;
        flex: 1;
      }

      .section-count {
        font-size: 0.78rem;
        font-weight: 600;
        color: #9ca3af;
        background: #f3f4f6;
        padding: 2px 8px;
        border-radius: 999px;
      }

      .section-search {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 0 10px;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }

      .section-search:focus-within {
        border-color: var(--ssd-primary);
        box-shadow: 0 0 0 3px rgba(0, 153, 25, 0.1);
        background: #ffffff;
      }

      .section-search-icon {
        font-size: 0.78rem;
        color: #9ca3af;
        line-height: 1;
      }

      .section-search input {
        border: none;
        outline: none;
        background: transparent;
        padding: 5px 0;
        font-size: 0.8rem;
        color: #1f2937;
        width: 160px;
      }

      .section-search input::placeholder {
        color: #9ca3af;
      }

      .order-list {
        display: flex;
        flex-direction: column;
      }

      .order-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 68px auto;
        gap: 12px;
        padding: 12px 20px;
        align-items: center;
        border-bottom: 1px solid #f9fafb;
        transition: background 0.12s ease;
        cursor: pointer;
        min-width: 0;
      }

      .order-row > *:first-child {
        min-width: 0;
        overflow: hidden;
      }

      .order-row:last-child {
        border-bottom: none;
      }

      .order-row:hover {
        background: #f9fafb;
      }

      .order-row.selected {
        background: rgba(0, 153, 25, 0.05);
      }

      .order-address-wrap {
        min-width: 0;
        overflow: hidden;
      }

      .order-address {
        font-size: 0.875rem;
        font-weight: 500;
        color: #1f2937;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: default;
        position: relative;
      }

      .order-customer {
        font-size: 0.82rem;
        color: #6b7280;
        margin-top: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .order-meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .meta-label {
        font-size: 0.68rem;
        font-weight: 600;
        color: #9ca3af;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .meta-value {
        font-size: 0.82rem;
        color: #374151;
      }

      .occupancy-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 68px;
        padding: 3px 0;
        border-radius: 999px;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        text-align: center;
        background: rgba(0, 153, 25, 0.1);
        color: #065f13;
        white-space: nowrap;
      }

      .install-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 11px;
        border: 1px solid #009919;
        border-radius: 6px;
        background: transparent;
        color: #009919;
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.12s ease, color 0.12s ease;
      }

      .install-btn:hover:not(:disabled) {
        background: #009919;
        color: #ffffff;
      }

      .install-btn:disabled {
        opacity: 0.4;
        cursor: default;
      }

      .overdue {
        color: #ef4444;
        font-weight: 600;
      }

      .edit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: transparent;
        color: #6b7280;
        font-size: 0.82rem;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
      }

      .edit-btn:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
        color: #374151;
      }

      .edit-btn.active {
        border-color: #6366f1;
        color: #6366f1;
        background: #f5f3ff;
      }

      .edit-panel {
        padding: 14px 20px;
        background: #fafafa;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: flex-end;
        border-left: 3px solid #6366f1;
      }

      .remove-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 11px;
        border: 1px solid #ef4444;
        border-radius: 6px;
        background: transparent;
        color: #ef4444;
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.12s ease, color 0.12s ease;
      }

      .remove-btn:hover:not(:disabled) {
        background: #ef4444;
        color: #ffffff;
      }

      .remove-btn:disabled {
        opacity: 0.4;
        cursor: default;
      }

      .btn-confirm-remove {
        background: #ef4444;
      }

      .btn-confirm-remove:hover:not(:disabled) {
        background: #dc2626;
      }

      .custom-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: transparent;
        color: #6b7280;
        font-size: 0.85rem;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
      }

      .custom-btn:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
        color: #374151;
      }

      .custom-btn.active {
        background: #f3f4f6;
        border-color: var(--ssd-primary);
        color: var(--ssd-primary);
      }

      .row-actions {
        display: flex;
        gap: 6px;
        align-items: center;
      }

      .install-panel {
        padding: 14px 20px;
        background: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: flex-end;
      }

      .install-panel-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-width: 180px;
      }

      .install-panel-field label {
        font-size: 0.72rem;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .install-panel-field input,
      .install-panel-field select {
        padding: 7px 10px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 0.875rem;
        color: #1f2937;
        background: #ffffff;
        outline: none;
        transition: border-color 0.12s ease, box-shadow 0.12s ease;
      }

      .install-panel-field input:focus,
      .install-panel-field select:focus {
        border-color: var(--ssd-primary);
        box-shadow: 0 0 0 3px rgba(0, 153, 25, 0.1);
      }

      .install-panel-actions {
        display: flex;
        gap: 8px;
        align-items: flex-end;
        padding-bottom: 1px;
      }

      .btn-confirm {
        padding: 7px 16px;
        background: var(--ssd-primary);
        color: #ffffff;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.12s ease;
      }

      .btn-confirm:hover:not(:disabled) {
        background: #00801a;
      }

      .btn-confirm:disabled {
        opacity: 0.5;
        cursor: default;
      }

      .btn-cancel {
        padding: 7px 12px;
        background: transparent;
        color: #6b7280;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 0.875rem;
        cursor: pointer;
      }

      .btn-cancel:hover {
        background: #f3f4f6;
      }

      .empty-state {
        padding: 32px 20px;
        text-align: center;
        color: #9ca3af;
        font-size: 0.875rem;
        font-style: italic;
      }

      .loading {
        padding: 32px 20px;
        text-align: center;
        color: #d1d5db;
        font-size: 0.875rem;
      }

      .pagination {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
        padding: 10px 16px;
        border-top: 1px solid #f3f4f6;
      }

      .page-info {
        font-size: 0.78rem;
        color: #9ca3af;
        margin-right: 4px;
      }

      .page-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        background: #ffffff;
        color: #374151;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background 0.12s ease, border-color 0.12s ease;
      }

      .page-btn:hover:not(:disabled) {
        background: #f3f4f6;
        border-color: #d1d5db;
      }

      .page-btn:disabled {
        opacity: 0.35;
        cursor: default;
      }
    `,
  ],
})
export class Home implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly employeesService = inject(EmployeesService);

  readonly pageSize = 5;
  readonly data = signal<DashboardData | null>(null);
  readonly employees = signal<Employee[]>([]);
  readonly services = signal<RequestService[]>([]);
  readonly installPage = signal(0);
  readonly removalPage = signal(0);
  readonly completedPage = signal(0);
  readonly savingOrderId = signal<string | null>(null);
  readonly installSearch = signal('');
  readonly removalSearch = signal('');
  readonly completedSearch = signal('');

  // Action panels (install / remove)
  readonly installPanelOrderId = signal<string | null>(null);
  readonly removePanelOrderId = signal<string | null>(null);

  // Edit panels
  readonly installEditOrderId = signal<string | null>(null);
  readonly removeEditOrderId = signal<string | null>(null);

  private firstEmployeeId = '';

  // Action panel fields
  panelEmployeeId = '';
  panelDate = '';

  // Install edit fields
  editAddress = '';
  editServiceId = 0;
  editInstallDate = '';
  editOccupancy = '';

  // Remove edit field
  editRemoveDate = '';

  ngOnInit(): void {
    this.refreshDashboard();
    this.employeesService.getEmployees().subscribe((employees) => {
      this.employees.set(employees);
      this.firstEmployeeId = employees[0]?.EmployeeID ?? '';
    });
    this.employeesService.getServices().subscribe((s) => this.services.set(s));
  }

  refreshDashboard(): void {
    this.dashboardService.getDashboard().subscribe((d) => this.data.set(d));
  }

  filter(items: DashboardOrder[], query: string): DashboardOrder[] {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return items;
    return items.filter((o) =>
      [o.belongsTo.FirstName, o.belongsTo.LastName, o.PropertyAddress]
        .some((f) => f.toLowerCase().includes(q))
    );
  }

  page(items: DashboardOrder[], pageIndex: number): DashboardOrder[] {
    return items.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
  }

  totalPages(items: DashboardOrder[]): number {
    return Math.ceil(items.length / this.pageSize);
  }

  onSearch(searchSignal: ReturnType<typeof signal<string>>, pageSignal: ReturnType<typeof signal<number>>, event: Event): void {
    searchSignal.set((event.target as HTMLInputElement).value);
    pageSignal.set(0);
  }

  customerName(order: DashboardOrder): string {
    return `${order.belongsTo.FirstName} ${order.belongsTo.LastName}`;
  }

  isOverdue(dateStr: string): boolean {
    return new Date(dateStr) < new Date();
  }

  // ── Install actions ───────────────────────────────────────────

  quickInstall(order: DashboardOrder, event: Event): void {
    event.stopPropagation();
    if (!this.firstEmployeeId || this.savingOrderId()) return;
    this.installPanelOrderId.set(null);
    this.savingOrderId.set(order.OrderID);
    this.employeesService.fulfillOrder(order.OrderID, this.firstEmployeeId).subscribe({
      next: () => { this.savingOrderId.set(null); this.refreshDashboard(); },
      error: () => this.savingOrderId.set(null),
    });
  }

  openInstallPanel(order: DashboardOrder, event: Event): void {
    event.stopPropagation();
    this.removePanelOrderId.set(null);
    if (this.installPanelOrderId() === order.OrderID) {
      this.installPanelOrderId.set(null);
      return;
    }
    this.installPanelOrderId.set(order.OrderID);
    this.panelEmployeeId = this.firstEmployeeId;
    this.panelDate = new Date().toISOString().slice(0, 16);
  }

  confirmInstall(): void {
    const orderId = this.installPanelOrderId();
    if (!orderId || !this.panelEmployeeId || this.savingOrderId()) return;
    this.savingOrderId.set(orderId);
    this.employeesService.fulfillOrder(orderId, this.panelEmployeeId, this.panelDate).subscribe({
      next: () => { this.installPanelOrderId.set(null); this.savingOrderId.set(null); this.refreshDashboard(); },
      error: () => this.savingOrderId.set(null),
    });
  }

  // ── Removal actions ───────────────────────────────────────────

  quickRemove(order: DashboardOrder, event: Event): void {
    event.stopPropagation();
    if (!this.firstEmployeeId || this.savingOrderId()) return;
    this.removePanelOrderId.set(null);
    this.savingOrderId.set(order.OrderID);
    this.employeesService.removeOrder(order.OrderID, this.firstEmployeeId).subscribe({
      next: () => { this.savingOrderId.set(null); this.refreshDashboard(); },
      error: () => this.savingOrderId.set(null),
    });
  }

  openRemovePanel(order: DashboardOrder, event: Event): void {
    event.stopPropagation();
    this.installPanelOrderId.set(null);
    if (this.removePanelOrderId() === order.OrderID) {
      this.removePanelOrderId.set(null);
      return;
    }
    this.removePanelOrderId.set(order.OrderID);
    this.panelEmployeeId = this.firstEmployeeId;
    this.panelDate = new Date().toISOString().slice(0, 16);
  }

  confirmRemove(): void {
    const orderId = this.removePanelOrderId();
    if (!orderId || !this.panelEmployeeId || this.savingOrderId()) return;
    this.savingOrderId.set(orderId);
    this.employeesService.removeOrder(orderId, this.panelEmployeeId, this.panelDate).subscribe({
      next: () => { this.removePanelOrderId.set(null); this.savingOrderId.set(null); this.refreshDashboard(); },
      error: () => this.savingOrderId.set(null),
    });
  }

  cancelPanel(section: 'install' | 'remove'): void {
    if (section === 'install') this.installPanelOrderId.set(null);
    else this.removePanelOrderId.set(null);
  }

  // ── Edit actions ──────────────────────────────────────────────

  openInstallEdit(order: DashboardOrder, event: Event): void {
    event.stopPropagation();
    this.installPanelOrderId.set(null);
    if (this.installEditOrderId() === order.OrderID) {
      this.installEditOrderId.set(null);
      return;
    }
    this.installEditOrderId.set(order.OrderID);
    this.editAddress = order.PropertyAddress;
    this.editServiceId = order.RequestedServiceID ?? 0;
    this.editInstallDate = order.RequestedInstallDate.slice(0, 16);
    this.editOccupancy = order.Occupancy;
  }

  confirmInstallEdit(order: DashboardOrder): void {
    if (this.savingOrderId()) return;
    this.savingOrderId.set(order.OrderID);
    this.employeesService.updateOrder(order.OrderID, {
      PropertyAddress: this.editAddress,
      RequestedServiceID: this.editServiceId,
      RequestedInstallDate: this.editInstallDate,
      Occupancy: this.editOccupancy,
    }).subscribe({
      next: () => { this.installEditOrderId.set(null); this.savingOrderId.set(null); this.refreshDashboard(); },
      error: () => this.savingOrderId.set(null),
    });
  }

  openRemoveEdit(order: DashboardOrder, event: Event): void {
    event.stopPropagation();
    this.removePanelOrderId.set(null);
    if (this.removeEditOrderId() === order.OrderID) {
      this.removeEditOrderId.set(null);
      return;
    }
    this.removeEditOrderId.set(order.OrderID);
    this.editRemoveDate = order.RequestedRemoveDate ? order.RequestedRemoveDate.slice(0, 10) : '';
  }

  confirmRemoveEdit(order: DashboardOrder): void {
    if (this.savingOrderId()) return;
    this.savingOrderId.set(order.OrderID);
    this.employeesService.updateOrder(order.OrderID, {
      RequestedRemoveDate: this.editRemoveDate || null,
    }).subscribe({
      next: () => { this.removeEditOrderId.set(null); this.savingOrderId.set(null); this.refreshDashboard(); },
      error: () => this.savingOrderId.set(null),
    });
  }

  cancelEdit(section: 'install' | 'remove'): void {
    if (section === 'install') this.installEditOrderId.set(null);
    else this.removeEditOrderId.set(null);
  }
}
