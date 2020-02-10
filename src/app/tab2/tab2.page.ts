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
  search:string;

  type:string;

  district:string;

  rango:any;

   resultArray:any;

  originalArray:any;

  constructor(private ruta: Router,private menu: MenuController,private visual:VisualesService,private conexion:ConexionesService) {

    this.menuOpen1=false;

    
  }
  ngOnInit(){
    this.menuOpen1=false;

    this.conexion.getRestaurantsList().then((data)=>{

      data.valueChanges().subscribe(
    
        res=>{

          this.originalArray=res;

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


 

  onClickInfo(restaurant:Restaurants){
    this.ruta.navigate(["restaurant-info",{data:JSON.stringify(restaurant)}]);
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


  onClickEdit(restaurant:Restaurants){
    this.visual.presentModalEdit(restaurant);
  }

  onSearchChange(){
    console.log(this.search);

    //console.log(this.visitedRestaurants);
   
    

      if(this.search==="" || this.search==undefined || this.search.length==0){
        console.log("entro");
       this.originalArray=this.notvisitedRestaurants;
       
      }
            
      if( this.search!==""){
       
        this.resultArray = this.originalArray.filter(element => element.name.includes(this.search) || element.type.includes(this.search) || element.district.includes(this.search)  && element.visited==false);
        this.originalArray=this.resultArray;

       }
      
    
      console.log(this.resultArray);
      
  }

  onClickFilters(){
    
    this.originalArray=this.notvisitedRestaurants;

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
   
    this.originalArray=this.notvisitedRestaurants;
    event.target.complete();
  }, 2000);
}

}
