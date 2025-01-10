import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Movie Management System</span>
    </mat-toolbar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      padding: 20px;
    }
  `],
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule]
})
export class AppComponent {}
