import { Component } from '@angular/core';
import { NavController, NavParams,  ViewController, } from 'ionic-angular';

@Component({
  selector: 'page-inbox-reply',
  templateUrl: 'inbox-reply.html'
})
export class InboxReplyPage {

  profile_img:any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController

  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }


  replyMessage(){
      console.log("Sending");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
