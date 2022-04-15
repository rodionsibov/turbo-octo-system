import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second New', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
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

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        console.log('addProduct', this.productForm.value);
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            this._snackBar.open('Product added successfully', 'Close', {
              duration: 4000,
            });
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            this._snackBar.open(`Error while adding the product: ${err}`);
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct(): void {
    
  }
}
