import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faGear,
  faHouse,
  faSignHanging,
  faUserClock,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './side-menu.html',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        background: #ffffff;
        padding: 16px 0;
        overflow: hidden;
      }

      .section-header {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #6b7280;
        padding: 0 24px;
        margin: 8px 0 4px;
        white-space: nowrap;
        overflow: hidden;
      }

      .menu-link {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 10px 24px;
        margin: 2px 12px;
        border-radius: 8px;
        color: #374151;
        font-size: 0.92rem;
        font-weight: 500;
        text-decoration: none;
        transition: background 0.15s ease, color 0.15s ease;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
      }

      .menu-link:hover {
        background: rgba(0, 153, 25, 0.08);
        color: #065f13;
      }

      .menu-link.active-link {
        background: var(--ssd-primary);
        color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 153, 25, 0.25);
      }

      .menu-link.active-link .menu-icon {
        color: #ffffff;
      }

      .menu-link.active-link .trailing-chip {
        background: rgba(255, 255, 255, 0.22);
        color: #ffffff;
      }

      .menu-icon {
        width: 18px;
        text-align: center;
        color: #6b7280;
        flex-shrink: 0;
      }

      .menu-link:hover .menu-icon {
        color: var(--ssd-primary);
      }

      .label {
        flex: 1 1 auto;
      }

      .trailing-chip {
        background: rgba(0, 153, 25, 0.12);
        color: #065f13;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 2px 10px;
        border-radius: 999px;
        line-height: 1;
      }

      .section-divider {
        height: 1px;
        background: #e5e7eb;
        margin: 12px 16px;
        border: none;
      }

      /* ── Tablet icon-rail (64px wide) ──────────────── */
      @media (max-width: 1023px) and (min-width: 768px) {
        .section-header {
          padding: 0;
          text-align: center;
          font-size: 0;           /* hide text, keep spacing */
          margin: 8px 0 4px;
        }

        .menu-link {
          padding: 10px 0;
          margin: 2px 8px;
          justify-content: center;
          gap: 0;
        }

        .label,
        .trailing-chip {
          display: none;
        }

        .menu-icon {
          width: 20px;
        }
      }
    `,
  ],
})
export class SideMenu {
  @Output() linkClicked = new EventEmitter<void>();

  readonly faHouse = faHouse;
  readonly faUserGroup = faUserGroup;
  readonly faSignHanging = faSignHanging;
  readonly faGear = faGear;
  readonly faUserClock = faUserClock;
}
