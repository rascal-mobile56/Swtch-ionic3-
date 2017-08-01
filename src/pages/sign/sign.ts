import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html'
})
export class SignPage {

  public profile_img:any;
  constructor(
    public navCtrl: NavController,
    public auth: AuthService

  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

}
