import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiServiceComponent } from './api-service/api-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private changeObservable: BehaviorSubject<any> = new BehaviorSubject(null);
  public count = 0;
  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'Ba Samson Lam',
    'Sorneau Clément'
  ];

  constructor(private apiService: ApiServiceComponent) {
    this.apiService.getDataWithPromiseShoppingCart().then((dataFromServer) => {
      dataFromServer.forEach(element => {
        this.count += element.quantity;
      });
    })
  }
  ngOnDestroy() {
    console.log('destroy')
  }
  ngOnInit() {
    this.apiService.getObservable().subscribe((data) => {
      if (data === "updateCart") {
        this.apiService.getDataWithPromiseShoppingCart().then((dataFromServer) => {
          dataFromServer.forEach(element => {
            this.count += element.quantity;
          });
        })
      }
    })
  }
}
