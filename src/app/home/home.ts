import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Bienvenido Usuario</h1>
    </div>
  `,
  styles: [`
    .home-container {
      width: 100%;
      height: 100vh;
      background: #2E7D32;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    h1 {
      color: white;
      font-size: 40px;
      font-weight: bold;
      font-family: "Open Sans", sans-serif;
    }
  `]
})
export class Home {}
