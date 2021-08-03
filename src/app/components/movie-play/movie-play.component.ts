import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/userData';
import { WatchingHistory } from 'src/app/models/watchingHistory';
import { AuthService } from 'src/app/services/auth.service';
import { MoviePlayService } from 'src/app/services/movie-play.service';
import { UserService } from 'src/app/services/user.service';
import videojs from 'video.js';

@Component({
  selector: 'app-movie-play',
  templateUrl: './movie-play.component.html',
  styleUrls: ['./movie-play.component.css'],
})
export class MoviePlayComponent implements OnInit, OnDestroy {
  public vjs: videojs.Player;
  urlVideo: string = '/assets/videos/Joker.mp4';
  urlPoster: string =
    'https://1.bp.blogspot.com/-WsNSf6jZvS0/XM3YV3O4ZDI/AAAAAAAACJ8/A7K0sxMcw_gb82SO9p7JYoAW9tPIIWxRQCKgBGAs/w0/john-wick-3-keanu-reeves-uhdpaper.com-4K-23.jpg';
  pictureUrl: string;

  user: User;
  userData: UserData;
  userId: string;
  movieId: number;

  constructor(
    private moviePlayService: MoviePlayService,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    if (this.vjs.hasStarted() && this.authService.isAuthanticated()) {
      this.updateWatchingHistory();
    }
    this.vjs.dispose();
    //console.log(this.vjs.currentTime());
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.movieId = params['id'];
      this.getMovie(this.movieId);
    });
    if (this.authService.isAuthanticated()) {
      this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
      this.getMovieFromWatchingHistory(this.userId, this.movieId);
    }
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  movie: Movie;
  videoOptions() {
    const options = {
      preload: 'metadata',
      sources: [
        {
          src: this.movie.videoUrl,
          type: 'video/mp4',
        },
      ],
      poster: this.movie.pictureUrl,
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
    this.vjs = videojs('my-player', options);
  }

  getMovie(movieId: number) {
    this.moviePlayService.getMovie(movieId).subscribe((response) => {
      this.movie = response;
      this.pictureUrl = this.movie.pictureUrl;
      this.videoOptions();

      console.log(this.getMovieOfUser(this.userId, movieId));
    });
  }

  getMovieOfUser(userId: string, movieId: number) {
    this.userService.getMovieOfUser(userId, movieId).subscribe((response) => {
      this.userData = response;
      console.log(this.userData);
    });
  }

  getMovieFromWatchingHistory(userId: string, movieId: number) {
    this.moviePlayService
      .getMovieFromWatchingHistory(userId, movieId)
      .subscribe((response) => {
        console.log(response);
        this.vjs.currentTime(response.passingTime);
      });
  }

  updateWatchingHistory() {
    let watchingHistory: WatchingHistory = {
      userId: this.userId,
      movieId: this.movieId,
      passingTime: Math.floor(this.vjs.currentTime())
    };
    this.moviePlayService
      .updateWatchingHistory(watchingHistory)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getDuration() {
    if (this.vjs.hasStarted()) {
      console.log(this.vjs.duration());
      console.log(this.vjs.currentTime());
    }
  }
}
