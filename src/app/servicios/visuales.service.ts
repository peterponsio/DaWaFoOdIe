import { Restaurants } from './../model/restaurant.interface';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { AutenticacionesService } from './autenticaciones.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { EditModalPage } from '../edit-modal/edit-modal.page'
import { ConexionesService } from './conexiones.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisualesService {


  name:string;

  constructor(public modalController: ModalController,private alert: AlertController, public toastController: ToastController , private aut:AutenticacionesService,private conexion:ConexionesService) { }


  //////////////Toast////////////////////////////////////////

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  /////////////////////Alert Controller///////////////////////////////////////////////////////

  async presentAlertPrompt(id: string) {

   
    const alert = await this.alert.create({
      header: 'Edit Film',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Film name'
        },
        {
          name: 'duration',
          type: 'number',
          placeholder: 'Duration'
        },


      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (datos) => {

            console.log(datos);
          
          }
        }
      ]
    });

    await alert.present();
  }



///////////////////////////////Alert to recover password///////////////////////////////////////////////////////////////////


  async Forgot_pass() {

    const alert = await this.alert.create({
      header: 'recover password',
      inputs: [
        {
          name: 'mail',
          type: 'text',
          placeholder: 'Put you mail'
        },
  
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (datos) => {

            this.presentToast("Check your email to change the password");

            this.aut.fortgot(datos.mail);

          }
        }
      ]
    });

    await alert.present();
  }
////////////////////////////////////////////////////////////////////////////////////////////////


async presentModalAdd() {
  const modal = await this.modalController.create({
   
    component: ModalPagePage,
    cssClass:"modal",
    
    
    componentProps: {
      'firstName': 'Douglas',
      'lastName': 'Adams',
      'middleInitial': 'N'
      
    },

    
  

  });

   await modal.present();

  const { data } = await modal.onDidDismiss();
  console.log(data);

  this.conexion.Add(data);

}

async presentModalEdit(restaurant:Restaurants) {
  const modal = await this.modalController.create({
   
    component: EditModalPage,
    componentProps: {
    'data_id':restaurant.id,
    },
    cssClass:"modal",
  
  });

   await modal.present();

  const { data } = await modal.onDidDismiss();
  console.log(data);

  this.conexion.Edit(data);

}


 
}
