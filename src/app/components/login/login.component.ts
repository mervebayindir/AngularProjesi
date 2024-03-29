import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService
    ){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email: ["", Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token", response.data.token)
        this.router.navigate(["products/admin-product-manager"])
      }, responseError=>{
        console.log(responseError)
        this.toastrService.error("Parola hatası" + responseError.error)
      })
    }
  }
}
