import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  productDeleteForm:FormGroup;
  products:Product[]=[];
  id:number;
  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private productService: ProductService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService){
      this.id = data.id
    }
    ngOnInit(): void{
      this.productService.getProducts()
   }
  //  createProductDeleteForm(){
  //   this.productDeleteForm = this.formBuilder.group({
  //     productName: ["", Validators.required],
  //     unitPrice: ["", Validators.required],
  //     unitsInStock: ["", Validators.required],
  //     categoryId: ["", Validators.required]
  //   })
  // }
    delete(){
      this.productService.delete(this.id).subscribe(response=>{
        
         this.toastrService.success(response.message, "Sime işlemi başarılı")
         debugger
      }, responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
             this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Silme işlemi başarısız")
          }
        }
      })  
  }
    close() {
      this.dialogRef.close();
  }
}
