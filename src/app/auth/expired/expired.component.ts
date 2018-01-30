import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TokenResponseInterceptor } from '../token.response.intercepter';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.css']
})
export class ExpiredComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<TokenResponseInterceptor>,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
      this.authService.logout();
    });
  }



}
