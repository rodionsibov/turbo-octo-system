import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'category',
    'price',
    'comment',
    'freshness',
    'date',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog(): void {
    this.dialog
      .open(DialogComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  getAllProducts(): void {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this._snackBar.open(`Error while fetching the products: ${err}`);
      },
    });
  }

  editProduct(row: any): void {
    this.dialog
      .open(DialogComponent, {
        width: '350px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProducts();
        }
      });
  }

  deleteProduct(id: number): void {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        this._snackBar.open('Product deleted successfully', 'Close', {
          duration: 4000,
        });
        this.getAllProducts();
      },
      error: (err) => {
        this._snackBar.open(`Error while deleting the product: ${err}`);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
