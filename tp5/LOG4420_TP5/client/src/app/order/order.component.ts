import { Component, OnInit } from '@angular/core';
import { ApiServiceComponent } from 'app/api-service/api-service';
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  firstName: string = "";
  lastName: string = "";
  phone: string = "";
  email: string = "";
  creditCard: string = "";
  creditCardExpiry: string = "";
  constructor(private apiSerivce:ApiServiceComponent){

  }
  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  submit() {
    if (!this.orderForm.valid()) {
      return;
    }
    // TODO: Compléter la soumission des informations lorsque le formulaire soumis est valide.

    // body['creditCard'] = this.creditCard;
    // body['creditCardExpiry'] = this.creditCardExpiry;
    this.apiSerivce.getDataWithPromiseShoppingCart().then((data)=>{
      if(data){
        let body = {};
     
        body['firstName'] = this.firstName;
        body['lastName'] = this.lastName;
        body['phone'] = this.phone;
        body['email'] = this.email;
        body['products'] = [];
        data.forEach((d)=>{
          body['products'].push({'id' : d.productId, 'quantity':d.quantity});
        })
        body['id'] = 1;
        // this.apiSerivce.postDataWithPromiseOrders(body);
        this.apiSerivce.getDataWithPromiseOrders().then((ord)=>{
          console.log(ord)
          let nextId = 0;
          if(ord){
            
            ord.forEach((o)=>{
              if(o.id > nextId){
                nextId = o.id;
              }
            })
          }
          body['id'] = nextId + 1;
          this.apiSerivce.deleteAllDataWithPromiseShoppingCart();
          this.apiSerivce.postDataWithPromiseOrders(body);
        });
        
      }
    })

  }
  // isValid &= !isNaN(order.id) && typeof order.id === "number";
  // isValid &= !!validator.trim(order.firstName);
  // isValid &= !!validator.trim(order.lastName);
  // isValid &= validator.isEmail(order.email);
  // isValid &= validator.isMobilePhone(validator.whitelist(order.phone, "0123456789"), "en-CA");
  // isValid &= order.products instanceof Array && order.products.every(function(product) {
  //   var productIsValid = true;
  //   productIsValid &= "id" in product;
  //   productIsValid &= "quantity" in product;
  //   if (!productIsValid) {
  //     return false;
  //   }
  //   productIsValid &= !isNaN(product.id) && typeof order.id === "number";
  //   productIsValid &= productsList.find(function(d) { return d.id === product.id; }) !== undefined;
  //   productIsValid &= !isNaN(product.quantity) && typeof product.quantity === "number" && product.quantity > 0;
}
