import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';

import { DataService } from './employees/shared/data.service';
import { EmployeeService } from './employees/shared/employee.service';
import { AlertService } from './employees/shared/alert.service';
import { ConfirmationDialogService } from './employees/confirm/confirmation-dialog.service';

import { PageNotFoundComponent } from './not-found/not-found.component';
import { AlertComponent } from './employees/alert/alert.component';
import { ConfirmComponent } from './employees/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    PageNotFoundComponent,
    AlertComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    EmployeeService,
    DataService,
    AlertService,
    NgbActiveModal,
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmComponent ],
})
export class AppModule { }
