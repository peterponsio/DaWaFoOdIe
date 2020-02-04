import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.page.html',
  styleUrls: ['./restaurant-info.page.scss'],
})
export class RestaurantInfoPage implements OnInit {

  constructor(private ruta:Router) { }

  ngOnInit() {

  }



  onClose(){
    this.ruta.navigateByUrl("home");
  }

}
