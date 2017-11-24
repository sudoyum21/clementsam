import { Component, OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiServiceComponent } from './api-service/api-service';
/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'Ba Samson Lam',
    'Sorneau Clément'
  ];

  constructor(private apiService : ApiServiceComponent){
  }


  ngOnInit(){
    
  }
  

  // TODO: À compléter
}
