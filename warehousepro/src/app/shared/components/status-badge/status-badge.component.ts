import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * StatusBadge - Reusable component to display status with color coding
 * Usage: <app-status-badge [status]="'Completed'"></app-status-badge>
 */
@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="getBadgeClass()">
      {{ status }}
    </span>
  `,
  styles: [`
    .badge {
      padding: 0.35em 0.65em;
      font-size: 0.875rem;
      font-weight: 500;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  /**
   * Returns Bootstrap badge class based on status
   */
  getBadgeClass(): string {
    const statusLower = this.status.toLowerCase();

    // Success states (green)
    if (['completed', 'active', 'delivered', 'shipped', 'fulfilled'].includes(statusLower)) {
      return 'bg-success';
    }

    // Warning states (yellow)
    if (['pending', 'expected', 'preparing', 'packing'].includes(statusLower)) {
      return 'bg-warning text-dark';
    }

    // Info states (blue)
    if (['inprogress', 'picking', 'intransit', 'received'].includes(statusLower)) {
      return 'bg-info text-dark';
    }

    // Danger states (red)
    if (['cancelled', 'expired', 'error', 'failed'].includes(statusLower)) {
      return 'bg-danger';
    }

    // Default (gray)
    return 'bg-secondary';
  }
}
