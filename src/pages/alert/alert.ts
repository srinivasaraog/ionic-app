import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
 
@Component({
  selector: 'alert-page',
  templateUrl: 'alert.html'
})
export class alertPage {
 
  constructor(public alertCtrl: AlertController) {}
 
//   doAlert() {
    
//   }
 
  doConfirm() {
   
        let alert = this.alertCtrl.create({
          title: 'Confirm purchase',
          message: 'Do you want to buy this book?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Buy',
              handler: () => {
                console.log('Buy clicked');
              }
            }
          ]
        });
        alert.present();
      }
  }
 
//   doPrompt() {
    
//   }
 
//   doRadio() {
    
//   }
 
//   doCheckbox() {
    
//   }
