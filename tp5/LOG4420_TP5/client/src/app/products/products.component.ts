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

  private products: any[] = [];
  category: String = "to";
  criteria: String = "bh";
  constructor(private apiService: ApiServiceComponent) {

  }
  ngOnInit() {
    var that = this;
    this.apiService.getDataWithPromiseProducts().then(function (data) {
      if (data) {
        that.products = data;
        // that.products.forEach(function(product){
        //   console.log(product)
        // })
      }
    })
  }
  onCriteriaClick(value: string) {
    this.criteria = value;
  }
  onCategoryClick(value: string) {
    this.category = value;
  }
}
