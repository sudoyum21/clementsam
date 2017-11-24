import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { } from '@angular/http';
@Component({
})
@Injectable()
export class ApiServiceComponent  implements OnInit   {
  private api:string;
  constructor(private http:Http) {
    this.api = "http://127.0.0.1:3000/";
   }
  ngOnInit() {
  }
  //app.use("/api/shopping-cart", shoppingCart);
// app.use("/api/orders", orders);
// app.use("/api/products", products);
  
getDataWithPromiseWithJSON( path): Promise<Response> { 
    return this.http.get(this.api + path).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  getDataWithPromiseProducts(): Promise<any> { 
    return this.http.get(this.api + "api/products").toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  getDataWithPromiseOrders( path): Promise<Response> { 
    return this.http.get(this.api + "api/orders").toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  getDataWithPromiseShoppingCart( path): Promise<Response> { 
    return this.http.get(this.api + "api/shopping-cart").toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
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
}
