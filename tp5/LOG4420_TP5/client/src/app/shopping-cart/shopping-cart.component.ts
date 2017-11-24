import { Component } from '@angular/core';
import { ApiServiceComponent } from 'app/api-service/api-service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent {
  // TODO: À compléter
  constructor(private apiService : ApiServiceComponent){
    var that = this;
    this.apiService.getObservable().subscribe(data => {

    
    })
  }
}
