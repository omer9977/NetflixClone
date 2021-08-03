import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { CategoryService } from 'src/app/services/category.service';
import { MoviePlayService } from 'src/app/services/movie-play.service';
import { MovieService } from 'src/app/services/movie.service';
import videojs from 'video.js';
import 'videojs-playlist';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  //public vjs: videojs.Player;
  vjs:any;
  categories: Category[] = [];
  movies: Movie[] = [];
  currentMovie: Movie;
  movie: Movie;
  timer: any;
  vj: any;
  filterText = '';
  @ViewChild('focus') focus: any;
  hidden = true;
  uuidValue: string;
  constructor(
    private moviePlayService: MoviePlayService,
    private categoryService: CategoryService,
    private movieService: MovieService
  ) {}

  ngOnDestroy(): void {
    this.vjs.dispose();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getMovies();
    this.getMovie(12);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  getMovies() {
    this.movieService.getMovies().subscribe((response) => {
      this.movies = response;
      console.warn(this.movies);
    });
  }

  hideandshow() {
    if (this.hidden) {
      this.hidden = false;
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        //this.focus.nativeElement.delay(8000).fadeIn();
        this.focus.nativeElement.focus();
      }, 0);
      setTimeout(() => this.focus.nativeElement.delay().fadeIn(), 10000);
    } else {
      this.hidden = true;
    }
  }

  onBlur() {
    this.hidden = true;
    //this.vjs.dispose();
    //this.vjs.reset();
  }

  videoOptions() {
    const options = {
      preload: 'none',
      sources: [
        {
          src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          type: 'video/mp4'
        },
      ],
      poster: "https://images.hdqwalls.com/download/joker-joaquin-phoenix-art-z5-1920x1080.jpg" ,
      autoplay: false,
      overrideNative: true,
      html5: {
        nativeVideoTracks: false,
        nativeAudioTracks: false,
        nativeTextTracks: false,
        hls: {
          withCredentials: false,
          overrideNative: true,
          debug: true,
        },
      },
      TextTrack: [
        {
          src: '/assets/subtitles/para.vtt',
          kind: 'captions',
          srclang: 'en',
          label: 'English',
        },
      ],
    };
    this.vjs = videojs('my-player');
    
    this.vjs.playlist([{
      sources: [{
        src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    }, {
      sources: [{
        src: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/bunny/poster.png'
    }, {
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }],
      poster: 'http://www.videojs.com/img/poster.jpg'
    }, {
      sources: [{
        src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/bunny/poster.png'
    }, {
      sources: [{
        src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/video/poster.png'
    }]);
    this.vjs.playlist.autoadvance(0);
  }

  getMovie(movieId: number) {
    this.moviePlayService.getMovie(movieId).subscribe((response) => {
      this.movie = response;
      // this.videoOptions();
    });
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }

  slideConfig = {
    autoplay: false,
    dots: false,
    centerMode: true,
    controls: true,
    centerPadding: '60px',
    slidesToShow: 4,
    slidesToScroll: 4,
    breakpoint: 768,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
    },
  };

  onMouseOverEvent() {
    console.log('SELAMLAR');
    //this.vjs.play();
    this.timer = setTimeout(() => console.log('NABER'), 4000);
    //if(this.vjs){
    //  this.vjs.show();
    //  this.vjs.play();
    //}
    //else{
    example: videojs.Player;
    //this.videoOptions(example);
    //}
  }

  onMouseLeaveEvent() {
    //console.log('BYE');
    //var example: any = this.vjs;
    //this.vjs.dispose();
    //this.vjs.hide();
    //this.vjs.pause();
   // clearTimeout(this.timer);
  }

  videoStart(){
    this.videoOptions();
    this.vjs.play();
  }
}
