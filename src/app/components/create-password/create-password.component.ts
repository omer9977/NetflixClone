import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css'],
})
export class CreatePasswordComponent implements OnInit {
  userForm: FormGroup;
  invalidEmail: boolean;
  gotPassword: boolean;
  userId: string;
  email: string;
  user:User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sendMailForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['userid']) {
        this.userId = params['userid'];
        this.gotPassword = true;
      } else {
        this.gotPassword = false;
      }
    });
  }

  sendMailForm() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  sendMail() {
    if (this.userForm.valid) {
      let user: User = Object.assign({}, this.userForm.value);
      console.log(this.userForm.value);
      this.authService.lostPassword(user).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {}
      );
    }
  }

  createPassword() {
    //if (this.userForm.valid) {
    let userpassword: User = Object.assign({}, this.userForm.value);
    //user.id = this.userId;
    //let user: User;
    this.userService.getUserById(this.userId).subscribe((response) => {
      this.user = response;
      this.user.password = userpassword.password;
      console.log(this.user);
    });
    this.authService.createPassword(this.user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {}
    );
    // }
  }
}
