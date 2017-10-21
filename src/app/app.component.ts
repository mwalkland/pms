import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  getType() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('type');
    }
  }
}
