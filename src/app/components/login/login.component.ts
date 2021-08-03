import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  lostPassword: boolean;
  confirmed: boolean;
  loginForm: FormGroup;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private registerService: RegisterService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(this.authService.isAuthanticated()){
      this.router.navigate(["/"]);
    }
    this.createLoginForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['userid']) {
        this.confirmUser(params['userid']);
        this.message = 'Sitemize Hoşgeldiniz. Artık Giriş Yapabilirsiniz.';
      }
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.warn(this.loginForm.value);
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          localStorage.setItem('token', JSON.stringify(response.token));
          localStorage.setItem('userId', JSON.stringify(response.id));
          this.invalidLogin = false;
          this.reloadCurrentRoute();
        },
        (error) => {
          this.invalidLogin = true;
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  confirmUser(id: string) {
    this.registerService.confirmUser(id).subscribe((response) => {
      this.confirmed = true;
    });
  }

  reloadCurrentRoute() {
    window.location.reload();
  }



  //   login(form: NgForm) {
  //     const credentials = {
  //       username: form.value.username,
  //       password: form.value.password,
  //     };

  //     this.http.post("https://localhost:44379/auth/login", credentials).subscribe(response => {
  //     const token = (<any>response).token;
  //     localStorage.setItem("jwt",token);
  //     this.invalidLogin = false;
  //     this.router.navigate(["/"]);
  //   },
  // err => {
  //   this.invalidLogin = true;
  // }
  //     );
  //   }
}
