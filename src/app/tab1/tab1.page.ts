import { ConexionesService } from './../servicios/conexiones.service';
import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VisualesService } from '../servicios/visuales.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { Restaurants } from '../model/restaurant.interface';
import { element } from 'protractor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name:string;

  search:string;

  visitedRestaurants: any;

   resultArray:any;

  originalArray:any;

  menuOpen1:boolean=false;

  type:string;

  district:string;

  rango:any;

  constructor(private ruta: Router,private menu: MenuController,private conexion:ConexionesService,private visual:VisualesService) {

    this.menuOpen1=false;

    
  }
  ngOnInit(){
    this.menuOpen1=false;

    this.conexion.getRestaurantsList().then((data)=>{

      data.valueChanges().subscribe(
    
        res=>{

          
          this.visitedRestaurants=res;
          this.originalArray=res;

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

  onClickInfo(restaurant:Restaurants){
    this.ruta.navigate(["restaurant-info",{data:JSON.stringify(restaurant)}]);
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

  onClickEdit(restaurant:Restaurants){
    this.visual.presentModalEdit(restaurant);
  }


  onSearchChange(){
    console.log(this.search);

    //console.log(this.visitedRestaurants);
   
    

      if(this.search==="" || this.search==undefined || this.search.length==0){
        console.log("entro");
       this.originalArray=this.visitedRestaurants;
       
      }
            
      if( this.search!==""){
       
        this.resultArray = this.originalArray.filter(element => element.name.includes(this.search) || element.type.includes(this.search) || element.district.includes(this.search) && element.visited==true);
        this.originalArray=this.resultArray;

       }
      
    
      console.log(this.resultArray);
      
  }

  onClickFilters(){
    
    this.originalArray=this.visitedRestaurants;

    console.log(this.type);

   if(this.type!= undefined){
        this.resultArray = this.originalArray.filter(element => element.type.includes(this.type) && element.visited==true);
        this.originalArray=this.resultArray;
   }
    if(this.district){
   
   
    this.resultArray = this.originalArray.filter(element => element.district.includes(this.district) && element.visited==true);
   
    this.originalArray=this.resultArray;
   }
   if(this.rango!=null || this.rango!=undefined){
    this.resultArray = this.originalArray.filter(element => element.rating.lower>=this.rango.lower && element.rating.upper<=this.rango.upper && element.visited==true);
    this.originalArray=this.resultArray;
   }
   
   console.log(this.originalArray);
   this.menu.close("filtros1");
}

doRefresh(event) {
  

  setTimeout(() => {
    
    this.originalArray=this.visitedRestaurants;
    event.target.complete();
  }, 2000);
}
}
