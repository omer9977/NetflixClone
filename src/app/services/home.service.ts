import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { WatchingHistory } from '../models/watchingHistory';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }
  
  getUserContinueWatchinglistByUserId(userId: string) {
    return this.httpClient.get<Movie[]>(
      'https://localhost:44379/Slider/GetMovieListFromWatchingHistory?userId=' + userId
    );
  }

  getMostRecentlyAddedsByUserId() {
    return this.httpClient.get<Movie[]>(
      'https://localhost:44379/Slider/GetRecentlyAddeds');
  }

  getMostViewed() {
    return this.httpClient.get<Movie[]>(
      'https://localhost:44379/Slider/GetMostViewed');
  }

  getMoviesByCategories() {
    return this.httpClient.get<Movie[][]>(
      'https://localhost:44379/Slider/GetMoviesByCategories');
  }

}
