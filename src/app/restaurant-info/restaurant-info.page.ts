import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.page.html',
  styleUrls: ['./restaurant-info.page.scss'],
})
export class RestaurantInfoPage implements OnInit {

  unCO:any;
  originalArray:any;

  constructor(private ruta:Router,public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  this.activatedRoute.params.subscribe(params=>{
  this.unCO = JSON.parse(params['data']);
})
    
      console.log(this.unCO);

  }



  onClose(){
    this.ruta.navigateByUrl("home");
  }

}
