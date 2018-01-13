import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';

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
        const currentUser = {
          email: data['email'],
          name: data['name'],
          type: data['type'],
          projectChosen: data['projectChosen']
        };
        localStorage.setItem('token', data['token']);
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.router.navigate(['/' + data['type']]);
      },
      error => {
        this.isError = true;
      });
  }

}
