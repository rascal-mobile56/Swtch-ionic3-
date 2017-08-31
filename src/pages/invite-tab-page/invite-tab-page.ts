import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InviteFriendPage } from '../invite-friend/invite-friend';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-invite-tab',
  templateUrl: 'invite-tab-page.html'
})
export class InviteTabPage {

  profile_img:any = '';
  constructor(
    public navCtrl: NavController,
    public userService: UserService,

  ) {
  }

  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

  goInviteFPage(){
    console.log("Go InviteFriendPage");
    this.navCtrl.push(InviteFriendPage);
  }
}
