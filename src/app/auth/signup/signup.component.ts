import { User } from './../user.model';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  type: string;
  signedUp: Boolean = false;
  error: Boolean = false;

  constructor(private builder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = this.builder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSignup() {
    const values = this.signupForm.value;
    const user = new User(
      values.email,
      values.password,
      values.firstname,
      values.surname,
      values.type
    );
    this.authService.signup(user)
      .subscribe(
      data => {
        this.signedUp = true;
      },
      error => {
        this.error = true;
      }
      );
    this.signupForm.reset();
  }

}
