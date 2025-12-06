import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../application/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast"
         [ngClass]="toastService.toastState().type"
         *ngIf="toastService.toastState().visible">
      <span>{{ toastService.toastState().message }}</span>
      <button (click)="toastService.close()">✖</button>
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    }
    .success { background-color: #2e7d32; }
    .error { background-color: #d32f2f; }
    .info { background-color: #0288d1; }

    button { background: none; border: none; color: white; cursor: pointer; font-size: 16px; }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
