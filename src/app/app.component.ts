import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-13-crud-material-ui';

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
    });
  }

  getAllProducts(): void {
    console.log('getAllProducts');
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(`Error while fetching the records: ${err}`);
      },
    });
  }
}
