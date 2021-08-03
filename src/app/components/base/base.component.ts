import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  userId: string;
  watchlist: number[] = [];

  constructor(
    protected userService: UserService,
    protected authService: AuthService,
    protected toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  getUserDataByUserId(userId: string) {
    this.userService.getUserDataByUserId(userId).subscribe((response) => {
      for (let index = 0; index < response.length; index++) {
        this.watchlist.push(response[index].movieId);
      }
      
      console.log(this.watchlist);
    });
  }

  addToWatchlist(_movieId: number) {
    if (this.authService.isAuthanticated()){
    let userData: UserData = { userId: this.userId, movieId: _movieId };
    this.userService.addMovieToWatchList(userData).subscribe();
    this.watchlist.push(_movieId);
  }
  else{
    this.toastrService.info('Öncelikle Giriş Yapmalısınız');
  }
}

  removeFromWatchlist(_movieId: number) {
    let userData: UserData = { userId: this.userId, movieId: _movieId };
    this.userService.removeFromWatchlist(userData).subscribe();
    const index: number = this.watchlist.indexOf(_movieId);
    if (index !== -1) {
        this.watchlist.splice(index,1);
    } 
  }

}
