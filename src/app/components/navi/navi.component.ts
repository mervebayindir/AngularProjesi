import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';



@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {

  loginModel:LoginModel;
  registerModel:RegisterModel;

  constructor(
    private router: Router,){}

  ngOnInit():void{

  }
  goToRegisterPage( ){
    debugger;
    this.router.navigate(["register"])
   }
   goToLoginPage(){
    debugger;
    this.router.navigate(["login"])
   }
}
