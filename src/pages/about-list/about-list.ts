import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'page-about-list',
  templateUrl: 'about-list.html'
})
export class AboutListPage {

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
  }

  backHome(){
    console.log("back AboutPage");
    this.navCtrl.pop();
  }

}
