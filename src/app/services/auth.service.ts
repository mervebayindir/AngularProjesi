import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false
  apiUrl="https://localhost:44314/api/auth/";
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  register(registerModel:RegisterModel): Observable<SingleResponseModel <ResponseModel>>{
    return this.httpClient.post <SingleResponseModel<ResponseModel>>(this.apiUrl + "register", registerModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
  /* isLoggedIn(){    giriş yapıldıgında veya cıkıldıgında gırıs yap butonu gızle cıkıs yap butonu aktıf et
    return this.loggedIn;
  }
  logOut(){
    localStorage.removeItem("isLogged")
    this.loggedIn=false
  } */
}
