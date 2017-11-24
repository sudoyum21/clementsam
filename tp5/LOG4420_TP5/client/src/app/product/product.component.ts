import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceComponent } from 'app/api-service/api-service';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  private product : {} = {};
  pop : boolean = false;
  quantityAdding : Number = 1;
  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private apiService:ApiServiceComponent) { 

    console.log(this.route.snapshot)
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    // TODO: Compléter la logique pour afficher le produit associé à l'identifiant spécifié (productId).
    var that = this;
    this.apiService.getDataWithPromiseProducts(productId).then(function(data){
      if(data){
        that.product = data;
        
      }
    })
  }

  onAddItemClick(){
    
    var that = this;
    this.pop = true;
    setTimeout(function(){
      that.pop = false;
      
    }, 3000);
    console.log({productId: this.product['id'], quantity: this.quantityAdding})
    this.apiService.postDataWithPromiseShoppingCart({productId: this.product['id'], quantity: this.quantityAdding});

  }
}
