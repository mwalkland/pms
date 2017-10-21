import { LogoutDialogComponent } from './logout/logout-dialog/logout-dialog.component';
import { AuthGuard } from './auth-guard.service';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
  MatDialogModule,
  MatListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    HttpClientModule,
    AuthRoutingModule,
    MatDialogModule,
    MatListModule
  ],
  exports: [
    AuthComponent,
    LogoutComponent
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    LogoutDialogComponent
  ],
  providers: [
    AuthGuard
  ],
  entryComponents: [LogoutDialogComponent]
})
export class AuthModule { }