import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Restaurants } from '../model/restaurant.interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {

  data_id;
  name:string;
  district:string;
  type:string;
  rango:string;
  comments:string;
  visited:boolean;
  opinion:string;

  constructor(private modal:ModalController) { }

  ngOnInit() {
    console.log(`${this.data_id}`)

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

  

 async onClickEdit(){

  this.modal.dismiss({
    id:`${this.data_id}`,
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
