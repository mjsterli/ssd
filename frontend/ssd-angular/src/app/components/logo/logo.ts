import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `<img class="logo" src="assets/ssd_black.svg" alt="SSD logo" />`,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        line-height: 0;
      }

      .logo {
        height: 48px;
        width: auto;
        display: block;
      }
    `,
  ],
})
export class Logo {}
