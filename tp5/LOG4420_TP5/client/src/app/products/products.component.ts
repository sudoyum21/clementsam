import { Component, OnInit } from '@angular/core';
import { ApiServiceComponent } from 'app/api-service/api-service';
/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  // TODO: À compléter
  // <h2>Manette Xbox 360</h2>
  // <img alt="Manette Xbox 360" src="./assets/img/xbox-controller.png">
  // <p><small>Prix</small> 29,99&thinsp;$</p>
  private products:any [] = [];
  constructor (private apiService : ApiServiceComponent){

  }
  ngOnInit(){
    var that = this;
    this.apiService.getDataWithPromiseProducts().then(function(data){
      if(data){
        that.products = data;
        that.products.forEach(function(product){
          console.log(product)
        })
      }
    })
  }
}
