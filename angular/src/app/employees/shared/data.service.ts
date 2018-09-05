import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Employee } from './employee.model';

@Injectable()
export class DataService {
    private employeeSource = new BehaviorSubject<number>(null);
    currentEmployee = this.employeeSource.asObservable();

    private confirmSource = new BehaviorSubject<boolean>(null);
    currentConfirm = this.confirmSource.asObservable();

    private deleteSource = new BehaviorSubject<boolean>(null);
    currentDelete = this.deleteSource.asObservable();

    private employeeListSource = new BehaviorSubject<Employee>(null);
    currentEmployeeList = this.employeeListSource.asObservable();

    constructor() {}

    selectedEmployee(EmpId: number) {
        this.employeeSource.next(EmpId);
    }

    selectedConfirm(value: boolean) {
        this.confirmSource.next(value);
    }

    selectedDelete(value: boolean) {
        this.deleteSource.next(value);
    }

    selectedEmployeeList(employee: Employee) {
        this.employeeListSource.next(employee);
    }
}