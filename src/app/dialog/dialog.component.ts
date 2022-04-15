import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second New', 'Refurbished'];
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      console.log('addProduct', this.productForm.value);
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          this._snackBar.open('Product added successfully', 'Close');
        },
        error: () => {
          this._snackBar.open('Error while adding the product')
        },
      });
    }
  }
}
