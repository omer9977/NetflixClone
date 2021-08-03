import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { HomeService } from 'src/app/services/home.service';
import { MoviePlayService } from 'src/app/services/movie-play.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(
    private moviePlayService: MoviePlayService,

    authService: AuthService,
    userService: UserService,
    private homeService: HomeService,
    private movieService: MovieService,
    private categoryService: CategoryService,
    toastrService: ToastrService
  ) {
    super(userService, authService, toastrService);
  }

  ngOnInit(): void {
    this.getMovie(2);
    //this.getMovies();
    if (this.authService.isAuthanticated()) {
      this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
      this.getUserDataByUserId(this.userId);
    }
    this.getUserWatchlistByUserId(this.userId);
    this.getUserContinueWatchinglistByUserId(this.userId);
    this.getMostRecenlyAddeds();
    this.getMostViewed();
    this.getCategories();
    this.getMoviesByCategories();
  }

  movie: Movie;
  watchingList: Movie[] = [];
  continueWatchinglist: Movie[] = [];
  mostRecentlyAdded: Movie[] = [];
  mostViewed: Movie[] = [];
  moviesByCategories: Movie[][];
  categories: Category[];
  currentMovie: Movie;

  slideConfig = {
    autoplay: false,
    dots: false,
    centerMode: false,
    centerPadding: '60px',
    slidesToShow: 4,
    slidesToScroll: 1,
    breakpoint: 768,
    settings: {
      arrows: false,
    },
  };

  getMovie(movieId: number) {
    this.moviePlayService.getMovie(movieId).subscribe((response) => {
      this.movie = response;
      console.log(this.movie);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      console.log(this.categories[0]);

      //this.movies = response;
      //console.warn(this.watchingList);
    });
  }

  getMovies() {
    this.movieService.getMovies().subscribe((response) => {
      //this.movies = response;
      console.warn(this.watchingList);
    });
  }

  getUserWatchlistByUserId(userId: string) {
    this.userService.getUserWatchlistByUserId(userId).subscribe((response) => {
      this.watchingList = response;
    });
  }

  getUserContinueWatchinglistByUserId(userId: string) {
    this.homeService
      .getUserContinueWatchinglistByUserId(userId)
      .subscribe((response) => {
        this.continueWatchinglist = response;
      });
  }

  getMostRecenlyAddeds() {
    this.homeService.getMostRecentlyAddedsByUserId().subscribe((response) => {
      this.mostRecentlyAdded = response;
    });
  }

  getMostViewed() {
    this.homeService.getMostViewed().subscribe((response) => {
      this.mostViewed = response;
    });
  }

  getMoviesByCategories() {
    this.homeService.getMoviesByCategories().subscribe((response) => {
    this.moviesByCategories = response;
console.log(response);
    });
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }

  // isUserAuthenticated() {
  //   const token = localStorage.getItem('jwt');
  //   if (token) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // logOut() {
  //   localStorage.removeItem('jwt');
  // }
}
