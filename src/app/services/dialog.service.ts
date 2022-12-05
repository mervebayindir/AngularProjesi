import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdminProductManagerComponent } from '../components/admin/admin-product-manager/admin-product-manager.component';
import { ConfirmDialogData } from '../models/confirm-dialog-data';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog:MatDialog) { }

  confimDialog(data:ConfirmDialogData): Observable<ResponseModel>{
    return this.matDialog.open(AdminProductManagerComponent,{
      data,
      width:'400px',
      disableClose:true
    }).afterClosed();
  }
}
