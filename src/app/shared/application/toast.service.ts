import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toastState = signal<Toast>({ message: '', type: 'info', visible: false });

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.toastState.set({ message, type, visible: true });

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.toastState.update(state => ({ ...state, visible: false }));
  }
}
