import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  productAddForm:FormGroup;

  product:Product;
  constructor(public dialogRef: MatDialogRef<ProductAddComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private formBuilder:FormBuilder, 
    private productService:ProductService, 
    private toastrService:ToastrService){
      this.product = data.product 
    }

   ngOnInit(): void{
      this.createProductAddForm();
   }
   createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName: ["", Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      categoryId: ["", Validators.required]
    })
   }
   add(){
    if (this.productAddForm.valid ) {
      let productModel = Object.assign({}, this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        
        this.toastrService.success(response.message, "Başarılı")
      }, responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik" ,"Dikatt!!!")
    }
   }

   close() {
    this.dialogRef.close();
  }
}
