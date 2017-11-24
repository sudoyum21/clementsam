import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
})
@Injectable()
export class ApiServiceComponent implements OnInit {
  private api: string;
  private changeObservable:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: Http) {
    this.api = "http://127.0.0.1:3000/";

  }
  ngOnInit() {
  }
  getObservable() {
    return this.changeObservable.asObservable();
  };
  //GENERAL QUERY
  getDataWithPromiseWithJSON(path): Promise<Response> {
    return this.http.get(this.api + path, this.buildPostHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  //PRODUCTS QUERY
  getDataWithPromiseProducts(path = ""): Promise<any> {
    return this.http.get(this.api + "api/products/" + path, this.buildPostHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  //ORDERS QUERY
  getDataWithPromiseOrders(path = ""): Promise<Response> {
    return this.http.get(this.api + "api/orders/" + path, this.buildPostHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  //SHOPPING-CART QUERY
  getDataWithPromiseShoppingCart(path = ""): Promise<Response> {
    return this.http.get(this.api + "api/shopping-cart/" + path, this.buildPostHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  postDataWithPromiseShoppingCart(body) {

    this.http.post(this.api + "api/shopping-cart/", body, this.buildPostHeader()).subscribe();
    this.changeObservable.next("updateCart");

  }
  extractData(res: Response) {
    let body = res.json();  // If response is a JSON use json()
    if (body) {
      return body['data'] || body;
    } else {
      return {};
    }
  }
  extractDataJSON(res: Response) {
    let body = res.json();
    return body;
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
  private buildPostHeader() : RequestOptions{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials : true });
    return options;
  }
}
