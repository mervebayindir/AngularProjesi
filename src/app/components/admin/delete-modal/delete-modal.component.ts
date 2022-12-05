import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';




@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  
  id:number;
  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private productService: ProductService,
    private toastrService:ToastrService){
      this.id = data.id
    }


  //   if (this.productAddForm.valid ) {
  //     let productModel = Object.assign({}, this.productAddForm.value)
  //     this.productService.add(productModel).subscribe(response=>{
        
  //       this.toastrService.success(response.message, "Başarılı")
  //     }, responseError=>{
  //       if (responseError.error.Errors.length>0) {
  //         for (let i = 0; i < responseError.error.Errors.length; i++) {
  //           this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
  //         }
  //       }
  //     })
  //   }else{
  //     this.toastrService.error("Formunuz eksik" ,"Dikatt!!!")
  //   }
  //  }



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
