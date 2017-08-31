import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-invite-friend',
  templateUrl: 'invite-friend.html'
})
export class InviteFriendPage {

  profile_img:any;
  constructor(
    public navCtrl: NavController,

  ) {
  }

  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }
  backPage(){
    this.navCtrl.pop();
  }

}
