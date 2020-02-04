import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  menuOpen:boolean;

  constructor(private ruta: Router,private menu: MenuController) {

    this.menuOpen=false;

  }



  onClose(){
    this.ruta.navigateByUrl("home");
  }

  onFilter(){
    if(this.menuOpen){
      this.menu.close("filtros");
      this.menuOpen=false;
    }else{
      this.menu.open("filtros");
      this.menuOpen=true;
    }
  }

  onClickInfo(){
    this.ruta.navigateByUrl("restaurant-info");
  }

}
