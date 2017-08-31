import { Component } from '@angular/core';
import { NavController, NavParams,  ViewController, } from 'ionic-angular';

@Component({
  selector: 'page-pay-reply',
  templateUrl: 'pay-reply.html'
})
export class PayReplyPage {

  profile_img:any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController

  ) {
  }
  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

  replyMessage(){
      console.log("Sending");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
