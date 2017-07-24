import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html'
})
export class SignPage {

  constructor(
    public navCtrl: NavController,
    public auth: AuthService

  ) {
  }

}
