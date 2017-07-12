import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {

  constructor(
    public navCtrl: NavController,

  ) {
  }
   ValidationEmail (email)
   {
     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
   }
  sendEmail(){
    console.log("Send Email");
    this.navCtrl.pop();
  }
  backHome(){
    console.log("backHome");
    this.navCtrl.pop();
  }
}
