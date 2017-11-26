import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceComponent } from 'app/api-service/api-service';
import * as _ from "lodash";

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  private product: {} = {};
  private currentCart: {} = {};
  pop: boolean = false;
  quantityAdding: Number = 1;
  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private apiService: ApiServiceComponent) {
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    // TODO: Compléter la logique pour afficher le produit associé à l'identifiant spécifié (productId).
    var that = this;
    this.apiService.getDataWithPromiseProducts("/"+productId).then(function (data) {
      if (data) {
        that.product = data;

      }
    })
  }

  onAddItemClick() {
    this.pop = true;
    // console.log({productId: this.product['id'], quantity: this.quantityAdding})
    this.apiService.getDataWithPromiseShoppingCart().then((dataFromServer) => {
      this.currentCart = dataFromServer;
      // console.log(this.currentCart)
      let dataFound = _.find(this.currentCart, (data) => {
        return data['productId'] == this.product['id'];
      })
      if (dataFound) {
        console.log(dataFound)
        this.apiService.putDataWithPromiseShoppingCart({ productId: this.product['id'], quantity: this.quantityAdding + dataFound['quantity'] });
      } else {
        this.apiService.postDataWithPromiseShoppingCart({ productId: this.product['id'], quantity: this.quantityAdding });
      }
    });
    setTimeout(()=>{
      this.pop = false;
    }, 3000);
  }
}
