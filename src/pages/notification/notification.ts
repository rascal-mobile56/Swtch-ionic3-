import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  public profile_img:any;
  constructor(
    public navCtrl: NavController,

  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }


}
