import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSignPage } from '../social_sign/social_sign';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController,

  ) {
  }
  ngOnInit(){
    this.gettingdata();
 }

  gettingdata(){
    console.log('go HomePage');
    this.navCtrl.setRoot(SocialSignPage);
  }
}
