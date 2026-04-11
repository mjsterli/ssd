import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
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
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    FaIconComponent,
  ],
  templateUrl: './side-menu.html',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 360px;
      }

      .menu-icon {
        margin-right: 12px;
        width: 20px;
        text-align: center;
      }

      .trailing {
        margin-left: auto;
      }

      .active-link {
        background: rgba(0, 153, 25, 0.12);
      }
    `,
  ],
})
export class SideMenu {
  readonly faHouse = faHouse;
  readonly faUserGroup = faUserGroup;
  readonly faSignHanging = faSignHanging;
  readonly faGear = faGear;
  readonly faUserClock = faUserClock;
}
