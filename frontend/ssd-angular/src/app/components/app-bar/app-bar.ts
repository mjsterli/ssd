import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Logo } from '../logo/logo';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    Logo,
  ],
  templateUrl: './app-bar.html',
  styles: [
    `
      .ssd-toolbar {
        background: var(--ssd-primary);
        color: white;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .user-name {
        font-family: monospace;
        font-weight: 700;
        margin-left: 8px;
      }

      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 24px;
      }
    `,
  ],
})
export class AppBar {
  readonly settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
}
