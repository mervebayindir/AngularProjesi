import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl="https://localhost:44314/api/";

  constructor(private httpClient:HttpClient) { }
    getProducts(): Observable<ListResponseModel<Product>>{
      let newPath = this.apiUrl + "products/getall"
      return this.httpClient.get<ListResponseModel<Product>>(newPath);
    }

    getProductById(id:number): Observable<SingleResponseModel<Product>>{
      let newPath = this.apiUrl + "products/getbyid?id=" + id;
      return this.httpClient.get<SingleResponseModel<Product>>(newPath);
    }
    getProductsByCategory(categoryId:number): Observable<ListResponseModel<Product>>{
      let newPath = this.apiUrl + "products/getbycategory?categoryId=" + categoryId
      return this.httpClient.get<ListResponseModel<Product>>(newPath);
    }

    add(product:Product): Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl + "products/add", product)
    }

    update(product:Product) : Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl + "products/update", product)
    }
    delete(id:any) : Observable<ResponseModel>{
      debugger
      return this.httpClient.get<ResponseModel>(this.apiUrl + "products/delete?id=" + id)
    }
  }


