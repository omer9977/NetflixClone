import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  movies: Movie[] = [];
  filterText = "";

  constructor(
    private movieService: MovieService
    ) {}

  ngOnInit(): void {
    this.getMovies();
    console.log(this.filterText);
  }

  getMovies() {
    this.movieService.getMovies().subscribe((response) => {
      this.movies = response;
    });
  }

filter(event:any){
  this.filterText = event;
  console.log(this.filterText);
}

}
