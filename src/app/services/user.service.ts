import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { User } from '../models/user';
import { UserData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserById(userId: string) {
    return this.httpClient.get<User>(
      'https://localhost:44379/Auth/GetUserById?userId=' + userId
    );
  }

  getUserDataByUserId(userId: string) {
    return this.httpClient.get<UserData[]>(
      'https://localhost:44379/Auth/GetUserDataByUserId?userID=' + userId
    );
  }

  getUserWatchlistByUserId(userId: string) {
    return this.httpClient.get<Movie[]>(
      'https://localhost:44379/Auth/GetUserWatchlist?userID=' + userId
    );
  }

  getMovieOfUser(userId: string, movieId: number) {
    return this.httpClient.get<UserData>(
      'https://localhost:44379/Auth/GetMovieOfUser?userId=' +
        userId +
        '&' +
        'movieId=' +
        movieId
    );
  }

  addMovieToWatchList(userData: UserData){
      return this.httpClient.post(
        'https://localhost:44379/auth/AddMovieToWatchlist',
        userData
      );
  }

  removeFromWatchlist(userData: UserData){
    return this.httpClient.post(
      'https://localhost:44379/auth/RemoveFromWatchlist',
      userData
    );
}
}
