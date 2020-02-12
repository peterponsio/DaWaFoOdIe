import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.page.html',
  styleUrls: ['./restaurant-info.page.scss'],
})
export class RestaurantInfoPage implements OnInit {

  unCO:any;
  originalArray:any;

  constructor(private _sanitizer: DomSanitizer,private ruta:Router,public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  this.activatedRoute.params.subscribe(params=>{
  this.unCO = JSON.parse(params['data']);
  this._sanitizer.bypassSecurityTrustUrl(this.unCO.img);
})
    
      //console.log(this.unCO);

  }

 /* getBackground(image) {
    
    console.log(image);

    return this._sanitizer.bypassSecurityTrustUrl(image);
  
}*/

  onClose(){
    this.ruta.navigateByUrl("home");
  }

}
