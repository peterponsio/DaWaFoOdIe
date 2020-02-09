import { ConexionesService } from './../servicios/conexiones.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VisualesService } from '../servicios/visuales.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { Restaurants } from '../model/restaurant.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name:string;

  visitedRestaurants:any;

  menuOpen1:boolean=false;

  constructor(private ruta: Router,private menu: MenuController,private conexion:ConexionesService,private visual:VisualesService) {

    this.menuOpen1=false;

    
  }
  ngOnInit(){
    this.menuOpen1=false;

    this.conexion.getRestaurantsList().then((data)=>{

      data.valueChanges().subscribe(
    
        res=>{

          this.visitedRestaurants=res;

            res.forEach(element=>{
            
            console.log(element);
            
            })
        })

    }).catch();
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
    this.visual.presentModalAdd();
  }

  onClickMark_Visited(restaurant:Restaurants){
    this.conexion.markNotVisited(restaurant);
  }

  onClickDelete_restaurant(id){
    this.conexion.delete(id);
  }

}
