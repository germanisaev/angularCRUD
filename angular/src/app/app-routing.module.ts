import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
 
const routes: Routes = [
   { 
     path: 'employees', 
     component: EmployeesComponent 
   },
   { 
     path: 'employee/add', 
     component: EmployeeComponent 
   },
   { 
     path: 'employees/:id', 
     component: EmployeeListComponent 
   },
   { 
     path: '', 
     redirectTo: 'employees', 
     pathMatch: 'full'
   }, 
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
 
export class AppRoutingModule {}
/*
import { NgModule }              from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { EmployeeListComponent }   from './employees/employee-list/employee-list.component';
import { EmployeesComponent }     from './employees/employees.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
 
const appRoutes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employees',        component: EmployeesComponent },
  { path: '',   redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
*/

