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
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*?[0-9])/)]],
      type: ['', Validators.required]
    });
  }

  onSignup() {
    const values = this.signupForm.value;
    const email = values.email as string;
    const user = new User(
      email.toLowerCase(),
      values.password,
      values.firstname,
      values.surname,
      values.type
    );
    this.authService.signup(user)
      .subscribe(
        data => {
          this.authService.login(new User(user.email, user.password)).subscribe();
        },
        error => {
          this.error = true;
        }
      );
    this.signupForm.reset();
    this.error = false;
  }

}
