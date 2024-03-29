import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ProductAddComponent } from '../product-add/product-add.component';


@Component({
  selector: 'app-admin-product-manager',
  templateUrl: './admin-product-manager.component.html',
  styleUrls: ['./admin-product-manager.component.css']
})
export class AdminProductManagerComponent {

  products:Product[] = [];
  dataLoaded=false;
  
  constructor(
    private productService:ProductService, 
    private router: Router,
    public dialog: MatDialog ){}

  ngOnInit():void{
      this.getProducts();
  }
  getProducts(){
   this.productService.getProducts().subscribe(response=>{
    this.products=response.data;
    this.dataLoaded=true; 
   })
  }
   goToProductDetailsPage(productId:number){
    this.router.navigate(["products/product-update/", productId])
   }
  showProductDeleteModal(productId: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    dialogConfig.data = {
        id: productId
    };

    const productDeleteModal = this.dialog.open(DeleteModalComponent, dialogConfig);

    productDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  addProductRouter(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";

    dialogConfig.data = {
        id: this.products
    };

    const productAddModal = this.dialog.open(ProductAddComponent, dialogConfig);
    dialogConfig.disableClose.valueOf()
    productAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
      
    })
   }
}
