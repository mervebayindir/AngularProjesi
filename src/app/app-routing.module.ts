import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { ProductEditComponent } from './components/admin/product-edit/product-edit.component';
import { ProductComponent } from './components/product/product.component';
import { LoginGuard } from './guards/login.guard';
import { AdminProductManagerComponent } from './components/admin/admin-product-manager/admin-product-manager.component';
import { ProductAddComponent } from './components/admin/product-add/product-add.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:ProductComponent},
  {path:"products",component:ProductComponent},
  {path:"products/category/:categoryId",component:ProductComponent},
  {path:"products/add", component:ProductAddComponent, canActivate:[LoginGuard]},
  {path:"products/product-update/:id", component:ProductEditComponent, canActivate:[LoginGuard]},
  {path:"products/admin-product-manager", component:AdminProductManagerComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"dashboard", component:DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
