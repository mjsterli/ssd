import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome back, Robert</p>
    </header>

    <div class="card welcome-card">
      <h2>Get started</h2>
      <p>Jump into your customer list to see active orders and recent activity.</p>
      <a routerLink="/customers" class="cta">View customers →</a>
    </div>
  `,
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
        padding: 32px;
      }

      .welcome-card h2 {
        font-size: 1.15rem;
        font-weight: 600;
        color: #111827;
        margin: 0 0 8px;
      }

      .welcome-card p {
        color: #4b5563;
        margin: 0 0 20px;
      }

      .cta {
        display: inline-block;
        background: var(--ssd-primary);
        color: #ffffff;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        padding: 10px 18px;
        border-radius: 8px;
        transition: background 0.15s ease, transform 0.1s ease;
      }

      .cta:hover {
        background: #00801a;
      }

      .cta:active {
        transform: translateY(1px);
      }
    `,
  ],
})
export class Home {}
