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

  getDataWithPromiseWithJSON(path:string = ""): Promise<any> {
    return this.http.get(this.api + path, this.buildHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  //PRODUCTS QUERY

  getDataWithPromiseProducts(path:string = ""): Promise<any> {
    return this.http.get(this.api + "api/products" + path, this.buildHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  //ORDERS QUERY

  getDataWithPromiseOrders(path:string = ""): Promise<any> {
    return this.http.get(this.api + "api/orders/" + path, this.buildHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  postDataWithPromiseOrders(body:any) {
    this.http.post(this.api + "api/orders/", body, this.buildHeader()).subscribe((data)=>{
      if(data){
        this.changeObservable.next(body);
      }
    },()=>{},()=>{
      this.changeObservable.next("updateCart");
    });
  }

  //SHOPPING-CART QUERY

  getDataWithPromiseShoppingCart(path:String = ""): Promise<any> {
    return this.http.get(this.api + "api/shopping-cart/" + path, this.buildHeader()).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  postDataWithPromiseShoppingCart(body:any) {
    this.http.post(this.api + "api/shopping-cart/", body, this.buildHeader()).subscribe((data)=>{
    },()=>{},()=>{
      this.changeObservable.next("updateCart");
    });
  }
  putDataWithPromiseShoppingCart(body:any) {
    console.log(body)
    this.http.put(this.api + "api/shopping-cart/"+body.productId, body, this.buildHeader()).subscribe((data)=>{
    },()=>{},()=>{
      this.changeObservable.next("updateCart");
    });
  }
  deleteDataWithPromiseShoppingCart(id:string) {
    this.http.delete(this.api + "api/shopping-cart/"+id, this.buildHeader()).subscribe((data)=>{
    },()=>{},()=>{
      this.changeObservable.next("updateCart");
    });
  }
  deleteAllDataWithPromiseShoppingCart() {
    this.http.delete(this.api + "api/shopping-cart/", this.buildHeader()).subscribe((data)=>{
      
    },()=>{},()=>{
      this.changeObservable.next("updateCart");
    });
  }



  //FIN
  extractData(res: any) {
    let body = res.json();  // If response is a JSON use json()
    if (body) {
      return body['data'] || body;
    } else {
      return {};
    }
  }
  extractDataJSON(res: any) {
    let body = res.json();
    return body;
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
  private buildHeader() : RequestOptions{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials : true });
    return options;
  }
}
