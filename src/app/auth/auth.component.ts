import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: '',
      password: ''
    });
    this.signupForm = this.builder.group({
      firstname: '',
      surname: '',
      signupEmail: '',
      signupPassword: ''
    });
  }

  onLogin() {
    console.log(this.loginForm);
  }

  onSignup() {
    console.log(this.signupForm);
  }

}
