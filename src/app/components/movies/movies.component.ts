import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { UserData } from 'src/app/models/userData';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent extends BaseComponent implements OnInit {
  categories: Category[] = [];
  movies: Movie[] = [];
  currentMovie: Movie;

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    authService: AuthService,
    userService: UserService,
    toastrService: ToastrService
  ) {
    super(userService, authService, toastrService);
  }

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.params.subscribe((params) => {
      if (params['category']) {
        this.getMoviesByCategory(params['category']);
      } else {
        this.getMovies();
      }
      if (this.authService.isAuthanticated()) {
        this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
        this.getUserDataByUserId(this.userId);
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  getMovies() {
    this.movieService.getMovies().subscribe((response) => {
      this.movies = response;
    });
  }

  getMoviesByCategory(category: number) {
    this.movieService.getMoviesByCategory(category).subscribe((response) => {
      this.movies = response;
    });
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }
}
