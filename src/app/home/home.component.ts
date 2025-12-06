import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #2E7D32;
      color: white;
      font-size: 3rem;
      font-family: 'Open Sans', sans-serif;
    ">
      Bienvenido Usuario
    </div>
  `,
})
export class HomeComponent {}
