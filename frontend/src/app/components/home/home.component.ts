import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

interface Movie {
  id?: string;
  title: string;
  genre: string;
  releaseYear: number;
}

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Add New Movie</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form #movieForm="ngForm" (ngSubmit)="addMovie()">
            <mat-form-field>
              <mat-label>Title</mat-label>
              <input matInput [(ngModel)]="newMovie.title" name="title" required>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Genre</mat-label>
              <input matInput [(ngModel)]="newMovie.genre" name="genre" required>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Release Year</mat-label>
              <input matInput type="number" [(ngModel)]="newMovie.releaseYear" name="releaseYear" required>
            </mat-form-field>

            <div class="button-container">
              <button mat-raised-button color="warn" type="reset" (click)="resetForm()">Reset</button>
              <button mat-raised-button color="accent" type="submit" [disabled]="!movieForm.form.valid">Add Movie</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="movie-list">
        <mat-card-header>
          <mat-card-title>Movie List</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-raised-button color="primary" (click)="fetchMovies()">View All Movies</button>
          
          <div *ngIf="movies.length > 0">
            <div *ngFor="let movie of movies" class="movie-item">
              <h3>{{movie.title}}</h3>
              <p>Genre: {{movie.genre}}</p>
              <p>Release Year: {{movie.releaseYear}}</p>
              <p class="movie-id">ID: {{movie.id}}</p>
            </div>
          </div>
          <div *ngIf="movies.length === 0 && hasAttemptedFetch" class="no-movies">
            No movies found.
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    .movie-list {
      margin-top: 20px;
    }
    .movie-item {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
    }
    .movie-item:last-child {
      border-bottom: none;
    }
    .button-container {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .no-movies {
      text-align: center;
      padding: 20px;
      color: #666;
    }
    .movie-id {
      font-size: 0.8em;
      color: #666;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  hasAttemptedFetch = false;
  newMovie: Movie = {
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear()
  };

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  fetchMovies() {
    this.apiService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.hasAttemptedFetch = true;
        this.showSnackbar('Movies fetched successfully', 'success');
      },
      error: (error) => {
        this.hasAttemptedFetch = true;
        const errorMessage = error.error?.message || 'Error fetching movies';
        this.showSnackbar(errorMessage, 'error');
        console.error('Error fetching movies:', error);
      }
    });
  }

  addMovie() {
    if (!this.isValidMovie(this.newMovie)) {
      this.showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    this.apiService.addMovie(this.newMovie).subscribe({
      next: (movie) => {
        this.showSnackbar(`Movie "${movie.title}" added successfully`, 'success');
        this.fetchMovies();
        this.resetForm();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Error adding movie';
        this.showSnackbar(errorMessage, 'error');
        console.error('Error adding movie:', error);
      }
    });
  }

  resetForm() {
    this.newMovie = {
      title: '',
      genre: '',
      releaseYear: new Date().getFullYear()
    };
  }

  private isValidMovie(movie: Movie): boolean {
    return !!(movie.title && movie.genre && movie.releaseYear);
  }

  private showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
