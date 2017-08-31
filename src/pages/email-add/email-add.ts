import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-email-add',
  templateUrl: 'email-add.html'
})
export class EmailAddPage {

  profile_img:any;
  constructor(
    public navCtrl: NavController,

  ) {
    }
    ionViewDidEnter(){
      this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
      console.log(this.profile_img);
    }

}
