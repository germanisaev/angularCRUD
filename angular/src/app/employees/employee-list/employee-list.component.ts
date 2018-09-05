import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
/*import { first } from 'rxjs/observable/first';*/
import 'rxjs/add/observable/timer';
// import 'rxjs/add/observable/first';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { DataService } from '../shared/data.service';
import { AlertService } from '../shared/alert.service';
import { Alert, AlertType } from '../shared/alert.model';
import { ConfirmationDialogService } from '../confirm/confirmation-dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  private timerSubscription: Subscription;
  private postsSubscription: Subscription;

  alert: Alert;
  employees: Employee[];
  employee: Employee;
  confirm: boolean;
  submitted = false;
  message: string;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
    private dataService: DataService) {

      this.employee = new Employee();
      this.employees = [];
    }

  ngOnInit() {
    this.getEmployees();
  }

  ngAfterViewInit() {
    /*
    this.dataService.currentDelete.subscribe(isDel => {
      if (isDel) {
        this.ngOnInit();
      }
    });
    */
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure to delete this record ?')
      .then((confirmed) => console.log('User confirmed:', confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(
        employees => {
          this.employees = employees;
          this.subscribeToData();
        },
        error => {
          this.alertService.alert(
            AlertType.Error,
            error
          );
        }
      );
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(2000).pipe(
      first()
    ).subscribe(() => this.getEmployees());
  }

  /*
  private refreshData(): void {
    this.postsSubscription = this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
  }
  */

  onEdit(_emp: Employee): void {
    this.employee = {
      EmployeeID: _emp.EmployeeID,
      FirstName: _emp.FirstName,
      LastName: _emp.LastName,
      EmpCode: _emp.EmpCode,
      Position: _emp.Position,
      Office: _emp.Office
    };
    this.dataService.selectedEmployee(this.employee.EmployeeID);
  }

  onDelete(_emp?: Employee): void {

    this.openConfirmationDialog();
    this.onEdit(_emp);
    this.dataService.currentDelete.subscribe(isDel => {
      console.log(isDel);
      if (isDel) {
        this.employeeService.deleteEmployee(this.employee)
          .subscribe(() => {
            /*this.employees = this.employees.filter((emp: Employee) => emp.EmployeeID !== this.employee.EmployeeID);*/
            this.alertService.alert(
              AlertType.Success,
              'Employee Deleted Successfully!'
            );
            this.ngOnInit();
            /*
            this.postService.delete(postToDelete).subscribe(() => {
              this.posts = this.posts.filter((post: Post) => post.id !== postToDelete.id);
          });*/
          },
            error => {
              this.alertService.alert(
                AlertType.Error,
                'Error occured while deleting the data. [' + error + ']'
              );
            }
          );
      }
    });
  }
}

