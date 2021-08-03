import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { WatchingHistory } from '../models/watchingHistory';

@Injectable({
  providedIn: 'root',
})
export class MoviePlayService {
  constructor(private httpClient: HttpClient) {}

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(
      'https://localhost:44379/Home/GetMoviebyId?id=' + id
    );
  }

  getMovieFromWatchingHistory(userId:string, movieId:number) {
    let watchingHistory:WatchingHistory = {userId:userId, movieId:movieId, passingTime:0}
    return this.httpClient.post<WatchingHistory>(
      'https://localhost:44379/Auth/GetMovieFromWatchingHistory',
      watchingHistory
    );
  }

  updateWatchingHistory(/*userId:string, movieId:number*/watchingHistory:WatchingHistory) {
    //let watchingHistory:WatchingHistory = {userId:userId, movieId:movieId, passingTime:0, dateTime:new Date()}
    return this.httpClient.post<WatchingHistory>(
      'https://localhost:44379/Auth/UpdateWatchingHistory',
      watchingHistory
    );
  }  
}
