import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VisualesService } from '../servicios/visuales.service';
import { ConexionesService } from '../servicios/conexiones.service';
import { Restaurants } from '../model/restaurant.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  menuOpen1:boolean=false;
  notvisitedRestaurants:any;

  constructor(private ruta: Router,private menu: MenuController,private visual:VisualesService,private conexion:ConexionesService) {

    this.menuOpen1=false;

    
  }
  ngOnInit(){
    this.menuOpen1=false;

    this.conexion.getRestaurantsList().then((data)=>{

      data.valueChanges().subscribe(
    
        res=>{

          this.notvisitedRestaurants=res;

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
      this.menu.close("filtros2");
      this.menuOpen1=false;
      console.log(this.menuOpen1);
    }else if(this.menuOpen1==false){
      this.menu.open("filtros2");
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
    this.conexion.markVisited(restaurant);
  }


  onClickDelete_restaurant(id){
    this.conexion.delete(id);
  }

}
