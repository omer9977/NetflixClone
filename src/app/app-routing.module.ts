import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MoviePlayComponent } from './components/movie-play/movie-play.component';
import { MoviesComponent } from './components/movies/movies.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { ShowsComponent } from './components/shows/shows.component';
import { SlickComponent } from './components/slick/slick.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomeComponent},
  {path:"movies", component:MoviesComponent},
  {path:"movies/:category", component:MoviesComponent},
  {path:"series", component:ShowsComponent},
  {path:"contact", component:ContactComponent},
  {path:"category", component:CategoryComponent},
  {path:"slick", component:SlickComponent},
  {path:"movie-play/:id", component:MoviePlayComponent},
  {path:"search", component:SearchComponent},
  {path:"login", component:LoginComponent},
  {path:"login/:userid", component:LoginComponent},
  {path:"watchlist", component:WatchListComponent, canActivate:[LoginGuard]},
  {path:"register", component:RegisterComponent},
  {path:"createPassword", component:CreatePasswordComponent},
  {path:"createPassword/:userid", component:CreatePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
