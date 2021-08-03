import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';


@Component({
  selector: 'app-slick',
  templateUrl: './slick.component.html',
  styleUrls: ['./slick.component.css']
})
export class SlickComponent implements OnInit {
  
 
  constructor(private movieService:MovieService) { }

  ngOnInit(): void { 
    this.getMovies();

  }
  movies:Movie[] = [];
  currentMovie:Movie;
  slideConfig = {
    autoplay: true,
  dots: false,
  centerMode: true,
  controls:true,
  centerPadding: '60px',
  "slidesToShow": 4, 
  "slidesToScroll": 4,
  breakpoint: 768,
  settings: {
  arrows: false,
  centerMode: true,
  centerPadding: '40px'}};
  getMovies(){
    this.movieService.getMovies().subscribe(response => {
     this.movies = response;
     console.warn(this.movies);
   });
   }
}
