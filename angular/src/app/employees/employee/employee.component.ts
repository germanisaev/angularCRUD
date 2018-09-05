import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { DataService } from '../shared/data.service';
import { Alert, AlertType } from '../shared/alert.model';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {

  alert: Alert;
  private selectedEmployee: number;

  employee = new Employee();
  submitted = false;
  message: string;

  constructor(
    private employeeService: EmployeeService,
    private data: DataService,
    private alertService: AlertService,
    /*private route: ActivatedRoute,
    private location: Location*/) { }

  ngOnInit(): void {
    /*const id = +this.route.snapshot.paramMap.get('id');*/
    this.data.currentEmployee.subscribe(emp => {
      this.selectedEmployee = emp;
      if (this.selectedEmployee > 0) {
        this.employeeService.getEmployee(this.selectedEmployee)
          .subscribe(employee => this.employee = employee);
      }
    });
  }

  ngAfterViewInit(): void {

  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      this.employeeService.addEmployee(form.value)
        .subscribe(() => {
          this.resetForm(form);
          this.employeeService.getEmployees();
          this.alertService.alert(
            AlertType.Success,
            'New Employee Added Succcessfully!'
          );
          this.data.selectedEmployeeList(form.value);
        },
          error => {
            this.alertService.alert(
              AlertType.Error,
              error
            );
          });
    } else {
      this.employeeService.updateEmployee(form.value.EmployeeID, form.value)
        .subscribe(() => {
          this.resetForm(form);
          this.employeeService.getEmployees();
          this.alertService.alert(
            AlertType.Success,
            'Employee Updated Succcessfully!'
          );
        },
          error => {
            this.alertService.alert(
              AlertType.Error,
              error
            );
          });
    }
  }

  /*goBack(): void {
    this.location.back();
  }*/

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    };
  }
}


