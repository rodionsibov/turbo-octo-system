import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second New', 'Refurbished'];
  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [''],
      category: [''],
      freshness: [''],
      price: [''],
      comment: [''],
      date: [''],
    });
  }

  addProduct(): void {
    console.log('addProduct', this.productForm.value);
  }
}
