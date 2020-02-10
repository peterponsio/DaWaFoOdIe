import { Component, OnInit, Input } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';
import { Restaurants } from '../model/restaurant.interface';
import { VisualesService } from '../servicios/visuales.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  name:string;
  district:string;
  type:string;
  rango:string;
  comments:string;
  visited:boolean;
  opinion:string;


  constructor(private modal:ModalController,private visual:VisualesService) {

    this.name="";

   }

  backdropDismiss = true;
  showBackdrop = true;
  shouldPropagate = false;
  data:any;

  ngOnInit() {
  }

  onClose(){
    this.modal.dismiss();
  }

  /////////////////////////////////////////////////////////////////////////////////

  newRestaurant:Restaurants={
    id: "",
    name: "",
    district:"",
    type: "",
    comments: "",
    rating: 0,
    visited:false,
    opinion:"",

  }

  

 async onClickAdd(){

  if(this.name=="" || this.district=="" || this.type==undefined || this.rango==undefined){
      this.visual.presentToast("Fill the fields to continue");
  }else{
    this.modal.dismiss({
      name:this.name,
      district:this.district,
      type:this.type,
      comments:this.comments,
      rating:this.rango,
      visited:this.visited,
      opinion:this.opinion
    });
   
  }

 
  
  }

  




 
}
