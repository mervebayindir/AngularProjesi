import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

  productEditForm : FormGroup;
  product:Product;
  id: string;
  dataLoaded=false;

  constructor (
    private formBuilder : FormBuilder,
    private productService : ProductService, 
    private toastrService : ToastrService,
    private route: ActivatedRoute){}

  ngOnInit(): void{
    this.editProductAddForm()
    this.route.paramMap.subscribe(paramMap => { 
      debugger;
      this.id = paramMap.get('id'); 
  });
    this.productService.getProductById( parseInt(this.id)).subscribe(response=>{
      this.product = response.data
      this.productEditForm.setValue({productId:this.product.productId, productName: this.product.productName, 
        unitPrice:this.product.unitPrice, 
        unitsInStock:this.product.unitsInStock, 
        categoryId:this.product.categoryId
      })
    })
  }

  editProductAddForm(){
    this.productEditForm = this.formBuilder.group({
      productId:["", Validators.required],
      productName: ["", Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      categoryId: ["", Validators.required]
    })
  }

  update(){
    if (this.productEditForm.valid ) {
      this.product = Object.assign({}, this.productEditForm.value)
      this.productService.update(this.product).subscribe(response=>{
        
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

}
