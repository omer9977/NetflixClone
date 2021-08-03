import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ShowsComponent } from './components/shows/shows.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryComponent } from './components/category/category.component';
import { SlickComponent } from './components/slick/slick.component';
import { MoviePlayComponent } from './components/movie-play/movie-play.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { LoginComponent } from './components/login/login.component';
//import { JwtModule } from "@auth0/angular-jwt"
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { BaseComponent } from './components/base/base.component';
import { SearchComponent } from './components/search/search.component';


export function tokenGetter(){
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MoviesComponent,
    ShowsComponent,
    ContactComponent,
    CategoryComponent,
    SlickComponent,
    MoviePlayComponent,
    FilterPipePipe,
    LoginComponent,
    WatchListComponent,
    RegisterComponent,
    CreatePasswordComponent,
    BaseComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ["localhost"],
    //     disallowedRoutes: []
    //   }
    // }),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
  LoginGuard,
SearchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
