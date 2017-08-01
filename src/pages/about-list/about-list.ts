import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'page-about-list',
  templateUrl: 'about-list.html'
})
export class AboutListPage {

  profile_img:any;
  public title:string;
  public url:any;
  link: SafeResourceUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private domSanitizer: DomSanitizer,
  ) {

    this.title = navParams.get("title");
    this.url = navParams.get("url");
    console.log(this.title, this.url);
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

  backHome(){
    console.log("back AboutPage");
    this.navCtrl.pop();
  }

}
