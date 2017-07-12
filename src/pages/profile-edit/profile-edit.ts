import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {

  @ViewChild('map') mapElement: ElementRef;
    map: any;

  constructor(
    public navCtrl: NavController,

  ) {
  }
  ionViewDidLoad(){
      this.loadMap();
      this.addMarker();

  }
  backPage(){
    this.navCtrl.pop();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(43.691657, -79.521701);

    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(){
    console.log("geolocation");

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

  }

}
