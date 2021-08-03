import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<TokenModel>(
      'https://localhost:44379/auth/login',
      loginModel
    );
  }

  isAuthanticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  lostPassword(user: User) {
    return this.httpClient.post(
      'https://localhost:44379/UserAuth/LostPassword',
      user
    );
  }

  createPassword(user: User) {
    return this.httpClient.post(
      'https://localhost:44379/UserAuth/CreatePassword',
      user
    );
  }

  
}
