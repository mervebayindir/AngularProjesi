import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  dataLoaded=false;

  products:Product[] = [];

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
   this.activatedRoute.params.subscribe(params=>{
    if(params["categoryId"]){
      this.getProductByCategory(params["categoryId"])
    }else{
      this.getProducts();
    }
   })
  }
  getProducts(){
   this.productService.getProducts().subscribe(response=>{
    this.products=response.data
    this.dataLoaded=true; 
   })
  }
  getProductByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
     this.products=response.data
     this.dataLoaded=true; 
    })
   }
}
