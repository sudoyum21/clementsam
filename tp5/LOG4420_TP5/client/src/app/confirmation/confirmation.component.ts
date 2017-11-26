import { Component } from '@angular/core';
import { ApiServiceComponent } from '../api-service/api-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
  // TODO: À compléter
  name:string = "";
  id = 0;
  constructor(private apiService: ApiServiceComponent) {

  }
  ngOnInit() {
    this.apiService.getDataWithPromiseOrders().then((data) => {
      if (data) {
        let lastOrderId = 0;
        let body = {};
        data.forEach((o) => {
          if(o.id > lastOrderId){
            lastOrderId = o.id;
            body = o;
          }
        })
        this.name = body['firstName'] + " " + body['lastName'];
        this.id = lastOrderId;
        console.log(body)
      }
    })
  }
}
