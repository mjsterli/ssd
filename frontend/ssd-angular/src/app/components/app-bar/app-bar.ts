import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Logo } from '../logo/logo';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [MatIconModule, MatBadgeModule, MatMenuModule, MatTooltipModule, Logo],
  templateUrl: './app-bar.html',
  styles: [
    `
      :host {
        display: block;
      }

      .ssd-navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--ssd-primary);
        color: #ffffff;
        padding: 0 24px;
        min-height: 64px;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }

      .hamburger {
        display: none;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: none;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        color: #ffffff;
        font-size: 1.4rem;
        line-height: 1;
        flex-shrink: 0;
        transition: background 0.15s ease;
      }

      .hamburger:hover {
        background: rgba(255, 255, 255, 0.15);
      }

      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 32px;
        color: #ffffff;
      }

      .toolbar-actions mat-icon {
        color: #ffffff;
      }

      .avatar-button {
        width: 40px;
        height: 40px;
        padding: 0;
        border: none;
        background: transparent;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .avatar-button:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 2px;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        aspect-ratio: 1 / 1;
      }

      .user-name {
        font-family: monospace;
        font-weight: 700;
        font-size: 0.95rem;
        color: #ffffff;
        white-space: nowrap;
      }

      .user-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Tablet & mobile: show hamburger */
      @media (max-width: 1023px) {
        .hamburger {
          display: flex;
        }
      }

      /* Mobile: hide user name, tighten gaps */
      @media (max-width: 767px) {
        .ssd-navbar {
          padding: 0 16px;
        }

        .toolbar-actions {
          gap: 16px;
        }

        .user-name {
          display: none;
        }
      }
    `,
  ],
})
export class AppBar {
  @Input() menuOpen = false;
  @Output() menuToggle = new EventEmitter<void>();

  readonly settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
}
