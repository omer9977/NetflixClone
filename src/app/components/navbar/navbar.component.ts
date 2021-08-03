import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private movieService:MovieService,
    private authService: AuthService,
    private search: SearchComponent,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getMovies();
    if (this.authService.isAuthanticated()) {
      this.isAuthanticated = true;
    }
    else{
      this.isAuthanticated = false;
    }
  }
  movies:Movie[] = [];
  filterText = "";
  @ViewChild("focus") focus: any;
  hidden = true;
  isAuthanticated: boolean;


  getMovies(){
    this.movieService.getMovies().subscribe(response => {
     this.movies = response;
   });
   }

   hideandshow(){
    if (this.hidden) {
      this.hidden = false;
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        //this.focus.nativeElement.delay(8000).fadeIn();
        this.focus.nativeElement.focus();
      },0);  
      
    }
    else{
      this.hidden = true;
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.reloadCurrentRoute();
  }
  onBlur(){
    this.hidden = true;
  }

  reloadCurrentRoute() {
    window.location.reload();
  }

  filter(event:any){
  //this.search.filterText = this.filterText;
  this.search.filter(event);
}
}
