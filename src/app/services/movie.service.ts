import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient:HttpClient) { }
  getMovies(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>("https://localhost:44379/home/GetMovies");
  }

  getMoviesByCategory(category:number): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>("https://localhost:44379/Home/GetMovieCategory?categoryId="+category);
  }

}
