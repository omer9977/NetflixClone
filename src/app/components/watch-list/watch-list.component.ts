import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/userData';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent extends BaseComponent implements OnInit {
  constructor(
    authService: AuthService,
    userService: UserService,
    toastrService: ToastrService
  ) {
    super(userService, authService, toastrService);
  }

  user: User;
  userData: UserData[];
  movies: Movie[];
  //movie: Movie;

  ngOnInit(): void {
    if (this.authService.isAuthanticated()) {
      this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
      //this.getUserById(this.userId);
      this.getUserDataByUserId(this.userId);
      this.getUserWatchlistByUserId(this.userId);
    }
  }

  // getUserById(userId: any) {
  //   this.userService.getUserById(userId).subscribe((response) => {
  //     this.user = response;
  //     console.log(this.user);
  //   });
  // }

  getUserWatchlistByUserId(userId: string) {
    this.userService.getUserWatchlistByUserId(userId).subscribe((response) => {
      this.movies = response;
    });
  }


  setCurrentMovie(m: Movie) {}
}
