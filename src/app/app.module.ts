import { StudentModule } from './student/student.module';
import { AppRoutingModule } from './app.routing';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StaffModule } from 'app/staff/staff.module';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    FormsModule,
    AppRoutingModule,
    StudentModule,
    StaffModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
