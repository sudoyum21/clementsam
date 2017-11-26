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
  private fullListProducts : any[] = [];
  private filters = {
    category: "all",
    sortingCriteria: "price-asc"
  };
  constructor(private apiService: ApiServiceComponent) {

  }
  ngOnInit() {
    this.apiService.getDataWithPromiseProducts().then((data) => {
      if (data) {
        this.products = data;
        this.fullListProducts = data;
        // that.products.forEach(function(product){
        //   console.log(product)
        // })
      }
    });
  }
  onCriteriaClick(value: string) {
    this.filters.sortingCriteria = value;
    let path = "?criteria="+this.filters.sortingCriteria;
    if (this.filters.sortingCriteria && this.filters.category !== "all") {
      path += "&category=" + this.filters.category
    }
    this.apiService.getDataWithPromiseProducts(path).then((data) => {
      if (data) {
        this.products = data;
        // that.products.forEach(function(product){
        //   console.log(product)
        // })
      }
    });
  }
  onCategoryClick(value: string) {
    this.filters.category = value;
    let path = "?criteria="+this.filters.sortingCriteria;
    if (this.filters.category && this.filters.category !== "all") {
      path += "&category=" + this.filters.category
    }
    this.apiService.getDataWithPromiseProducts(path).then((data) => {
      if (data) {
        this.products = data;
        // that.products.forEach(function(product){
        //   console.log(product)
        // })
      }
    });
  }



}
