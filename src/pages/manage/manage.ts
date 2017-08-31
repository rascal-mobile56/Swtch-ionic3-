import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage {

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
