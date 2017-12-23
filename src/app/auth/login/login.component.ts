import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError = false;

  constructor(private builder: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const values = this.loginForm.value;
    const user = new User(values.email, values.password);
    this.authService.login(user)
      .subscribe(data => {
        localStorage.setItem('token', data['token']);
        localStorage.setItem('type', data['type']);
        localStorage.setItem('name', data['name']);
        user.type = data['type'];
        this.authService.setCurrentUser(user);
        this.router.navigate(['/' + data['type']]);
      },
      error => {
        this.isError = true;
      });
  }

}
