import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from '../shared/alert.model';
import { AlertService } from '../shared/alert.service';
//import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert: Alert;
  submitted: boolean = false;
  message: string;
  alertClass: string;

  constructor(private alertService: AlertService) {
    //this.data.currentAlert
  }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alert = null;
        return;
      }
      this.alert = alert;
      this.cssClass(this.alert);
      this.message = this.alert.message;
      this.submitted = true;
    });
  }

  removeAlert(alert: Alert) {
    //this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        this.alertClass = 'alert alert-success';
      case AlertType.Error:
        this.alertClass = 'alert alert-danger';
      case AlertType.Info:
        this.alertClass = 'alert alert-info';
      case AlertType.Warning:
        this.alertClass = 'alert alert-warning';
    }
  }
}

