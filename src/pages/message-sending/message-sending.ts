import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-message-sending',
  templateUrl: 'message-sending.html'
})
export class MessagesSendingPage {

  public name:string;
  public profile_img:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {
    this.name = navParams.get("name");
  }
  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

}
