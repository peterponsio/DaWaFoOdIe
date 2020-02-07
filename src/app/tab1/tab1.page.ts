import { ConexionesService } from './../servicios/conexiones.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  menuOpen1:boolean=false;

  constructor(private ruta: Router,private menu: MenuController,private conexion:ConexionesService) {

    this.menuOpen1=false;

    
  }
  ngOnInit(){
    this.menuOpen1=false;
  }

  onClose(){
    this.ruta.navigateByUrl("home");
  }

  onFilter(){
    if(this.menuOpen1){
      this.menu.close("filtros1");
      this.menuOpen1=false;
      console.log(this.menuOpen1);
    }else if(this.menuOpen1==false){
      this.menu.open("filtros1");
      this.menuOpen1=true;
      console.log(this.menuOpen1);
    }else{
      this.menuOpen1=false;
      console.log(this.menuOpen1);
    }
  }

  onClickInfo(){
    this.ruta.navigateByUrl("restaurant-info");
  }

  onClickAddRestaurant(){
    this.conexion.Add();
  }

}
