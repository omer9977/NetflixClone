import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidLogin: boolean;
  registered: boolean;
  registerForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.authService.isAuthanticated()){
      this.router.navigate(["/"]);
    }
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }
    );
  }

  register(){
    console.log(this.registerForm.value);
      let user:User = Object.assign({}, this.registerForm.value);
    console.log(user);

    this.registerService.register(user).subscribe((response) => {
      this.registered = true;
      console.log(response);
    });
  }

}
