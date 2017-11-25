import { Component, OnInit } from '@angular/core';
import { ApiServiceComponent } from 'app/api-service/api-service';
import * as _ from "lodash";

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  // TODO: À compléter
  private scFromServer : any[] = [];
  private products : any[] = [];
  private sc : any[] = [];
  private total = 0;
  constructor(private apiService : ApiServiceComponent){
  }
  ngOnInit(){
    this.apiService.getDataWithPromiseShoppingCart().then(sc => {
      this.scFromServer = sc;
      if(this.scFromServer && this.scFromServer.length > 0){
        this.apiService.getDataWithPromiseProducts().then(products => {
          this.products = products;
          this.scFromServer.forEach(item => {
            let foundProduct = null;
            if(foundProduct = _.find(this.products, (prod) =>{
              return prod.id === item.productId;
            })){
              let total = item.quantity * foundProduct.price;
              let convertedToComma = total.toString().replace('.' , ",");
              
              this.sc.push({product:foundProduct, quantity : item.quantity, total : convertedToComma})
              this.total += total;
            }
          })
        })
      }
    })
  }

  removeItem(item){
    item.quantity--;
  }
  addItem(item){
    item.quantity++;
  }
  clearRow(item){
    let idx = this.sc.indexOf(item);
    if(idx !== -1){
      this.sc.splice(idx,1);
    }
  }
}
