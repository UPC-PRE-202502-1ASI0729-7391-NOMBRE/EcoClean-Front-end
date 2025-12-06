import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/presentation/components/toast/toast.component'; // Importar

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, ToastComponent] // Agregar aquí
})
export class AppComponent {}
