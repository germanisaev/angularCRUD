import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
//import { Observable, interval, pipe } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
//import { toPromise } from 'rxjs/operator/toPromise';
//import { toPromise, delay } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/throw';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';
//import { IEmployee } from './employee.model';
import { environment } from '../../../environments/environment';


@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList: Employee[];

  body: any;
  headerOptions: any;
  requestOptions: any;

  constructor(private http: Http) { }

  getEmployees(): Observable<Employee[]> { //: Observable<Employee[]> {
    ///return this.http.get<Employee[]>(environment.webAPI)
    //this.http.get(this.url).map(res => res.json()).subscribe(items => console.log(items));
    /*
    this.http.get(url)
    .pipe(map(r => r.json()))
    .subscribe(resp => {resp = resp.json();console.log(resp);});
    */
    return this.http.get(environment.webAPI)
    .pipe(
      map((data: Response) => <Employee[]>data.json()),
      catchError(this.errorHandler)
    );
    //.catch(this.errorHandler);
    //.subscribe(x => {this.employeeList = x.json() as Employee[]});
    //).pipe(toPromise().then(x => {
    //  this.employeeList = x;
    //}));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${environment.webAPI}/${id}`;
    //return this.http.get<Employee>(url);
    return this.http.get(url)
      .pipe(
        map(x => <Employee>x.json()),
        catchError(this.errorHandler)
      )
      ;
  }

  /*
  .subscribe((x: any) => addItem(x))
  getproducts():Observable<IProduct[]>{
      return this._http.get(this._producturl)
      .map((response: Response) => <IProduct[]> response.json())
      .do(data =>console.log(JSON.stringify(data)));
      }
  */

  addEmployee(employee: Employee): Observable<Employee> {
    this.body = JSON.stringify(employee);
    this.headerOptions = new Headers({ 'Content-Type': 'application/json' });
    this.requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions });
    return this.http.post(environment.webAPI, this.body, this.requestOptions).pipe(
      map(x => x.json()),
      catchError(error => of(`Bad Promise: ${error}`))
    );
  }

  deleteEmployee(employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.EmployeeID;
    const url = `${environment.webAPI}/${id}`;

    //return this.http.delete<Employee>(url, httpOptions);
    console.log(url);

    //return this.http.delete<Employee>(url);
    return this.http.delete(url).pipe(
      map(x => x.json()),
      catchError(error => of(`Bad Promise: ${error}`))
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    const url = `${environment.webAPI}/${id}`;
    this.body = JSON.stringify(employee);
    this.headerOptions = new Headers({ 'Content-Type': 'application/json' });
    this.requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: this.headerOptions });
    return this.http.put(url,
      this.body,
      this.requestOptions).pipe(
        map(res => res.json()),
        catchError(error => of(`Bad Promise: ${error}`))
      );
    //return this.http.put(environment.webAPI, employee, httpOptions);
    //return this.http.put(environment.webAPI, employee);
  }

  /*
  postEmployee(emp: Employee) {
    this.body = JSON.stringify(emp);
    console.log(this.body);
    this.headerOptions = new Headers({'Content-Type': 'application/json'});
    this.requestOptions = new RequestOptions({method : RequestMethod.Post, headers : this.headerOptions});
    return this.http.post(environment.webAPI, this.body, this.requestOptions).pipe(map(x => x.json()));
  }
 
  putEmployee(id: number, emp: Employee) {
    this.body = JSON.stringify(emp);
    this.headerOptions = new Headers({ 'Content-Type': 'application/json' });
    this.requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: this.headerOptions });
    return this.http.put(environment.webAPI + id,
      this.body,
      this.requestOptions).pipe(map(res => res.json()));
  }
 
  getEmployeeList() {
    this.http.get(environment.webAPI).pipe(
      map((data: Response) => {
        return data.json() as Employee[];
      })
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete(environment.webAPI + id).pipe(map(res => res.json()));
  }
  */
}

/*
.toPromise().then(x => {
        this.employeeList = x;
      })
*/