import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(user: User) {
    return this.httpClient.post(  //Burada post message türünde geri dönecek
      'https://localhost:44379/UserAuth/SignUp',
      user
      );
    }

    confirmUser(id:string):Observable<User>{
      return this.httpClient.get<User>( 
        'https://localhost:44379/UserAuth/ConfirmMail?Id='+id
        );
    }
}
