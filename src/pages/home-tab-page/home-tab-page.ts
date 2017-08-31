import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, FabContainer } from 'ionic-angular';
import { UserInfoPage } from '../user-info/user-info';
import { UserProfilePage } from '../user-profile/user-profile';

import { ProfilePage } from '../profile/profile';
import { InboxPage } from '../inbox/inbox';
import { ManagePage } from '../manage/manage';
import { SettingsPage } from '../settings/settings';
import { SignPage } from '../sign/sign';
import { ListChargerPage } from '../list-charger/list-charger';

import { UserService } from '../../services/user-service';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


declare var google;

@Component({
  selector: 'page-home-tab',
  templateUrl: 'home-tab-page.html'
})
export class HomeTabPage {

  @ViewChild('map') mapElement: ElementRef;
    map: any;
    profiles:any=[];
    person:any;
    profile_img:any;
    length:string;
    openState:string;
    currentLat:number;
    currentLng:number;
    lat:string;
    lng:string;
    address:string;
    current_marker:any;
    oldInfo:any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public  alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public userService: UserService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
  ) {

    }

  ionViewWillEnter(){
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
    console.log('accessToken', accessToken);
    if(accessToken){
      this.getCallbackData(accessToken);
    }else{
      window.localStorage.clear();
      this.getMainData();
    }
  }

  getCallbackData(token){
    this.userService.callbackData(token)
      .subscribe(
        (data) => {
          if(data.success == false){
            console.log("No data");
            this.getMainData();
         }else{
           console.log(data);
           window.localStorage.setItem('person_id', data.api.person_id);
           this.getProfileData();
         }
      },
      (error) => {
        console.log(error);
      });
  }

  getProfileData(){
    let person_id = window.localStorage.getItem('person_id');
    // let person_id = "F2z8qVPuveLvUgsIJN1wXw";

    let loading = this.loadingCtrl.create();
    loading.present();

    this.userService.getPersonData(person_id)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
         }else{
           console.log(data);
           this.person = data;
           window.localStorage.setItem('profile_img', data.image_url);
           this.getMainData();
         }
      },
      (error) => {
        console.log(error);
      });
  }

  close(fab: FabContainer) {
   fab.close ();
   console.log ( "Sharing in");
 }

  goListChargerPage(){
    this.navCtrl.push(ListChargerPage);
  }

  goSignPage(){
    this.navCtrl.push(SignPage);
  }
  goSettingPage(){
    console.log('goSettingPage');
    this.navCtrl.push(SettingsPage);
  }
  goManagePage(){
    console.log('goManagePage');
    this.navCtrl.push(ManagePage);
  }
  goInboxPage(){
    console.log('goMessageBox');
    this.navCtrl.push(InboxPage);
  }
  goProfilePage(){
    console.log('goProfilePage');
    this.navCtrl.push(ProfilePage);
  }



  getMainData(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.getProfiles()
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
         }else{
           this.profiles = data.data;
           console.log(this.profiles);
           this.geolocationData();
         }
      },
      (error) => {
        console.log(error);
      });
  }

  geolocationData(){
    this.geolocation.getCurrentPosition().then((res) => {
        this.currentLat = res.coords.latitude;
        this.currentLng = res.coords.longitude;
        this.loadMap(this.currentLat, this.currentLng);

        console.log(this.currentLat + ", " + this.currentLng);

    }).catch((error) => {
        console.log('Error getting location', error);
    });
  }

  searchAddress(address){
    console.log(address);
    this.nativeGeocoder.forwardGeocode(address)
      .then((coordinates: NativeGeocoderForwardResult) => this.LatLng(coordinates.latitude, coordinates.longitude))
      .catch((error: any) => this.undefinedAddress());
  }

  undefinedAddress(){
    let alert = this.alertCtrl.create({
      title: 'Undefined Address!',
      subTitle: 'Your address is incorrect!',
      buttons: ['OK']
    });
    alert.present();
  }

  LatLng(latitude, longitude){
    console.log('The coordinates are latitude=' + latitude + ' and longitude=' + longitude);
    this.lat = latitude;
    this.lng = longitude;
    this.loadMap(this.lat, this.lng);
  }

  loadMap(currentLat, currentLng) {

    let latLng = new google.maps.LatLng(currentLat, currentLng);

    let mapOptions = {
      center: latLng,
      zoom: 6,
      styles:[
          {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
              {
                  "saturation": "-100"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
              {
                  "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 65
              },
              {
                  "visibility": "on"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": "50"
              },
              {
                  "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                  "saturation": "-100"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
              {
                "lightness": "30"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
              {
                "lightness": "40"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "hue": "#ffff00"
              },
              {
                "lightness": -25
              },
              {
                "saturation": -97
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              {
                "lightness": -25
              },
              {
                "saturation": -100
              }
            ]
          }
      ],
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMarker();
  }

  addMarker(){

    for(let i = 0; i<this.profiles.length; i++){

      // let latLng = new google.maps.LatLng(this.profiles[i].location.latitude, this.profiles[i].location.longitude);
      let latLng = new google.maps.LatLng(this.profiles[i].latitude, this.profiles[i].longitude);
      if(this.profiles[i].booked == true){
        this.openState = 'assets/icon/maker_open.png';
      }else{
        this.openState = 'assets/icon/maker_close.png'
      }
      // console.log("latLng1", latLng);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: this.openState,
      });
      let content;
      let username;
      if( this.profiles[i].author.family_name || this.profiles[i].author.given_name ){

        username =  this.profiles[i].author.family_name +" " + this.profiles[i].author.given_name;
      } else{

        username = this.profiles[i].author.username;
      }
      let bg_img;

      if(this.profiles[i].listing_images[0] == null){

        bg_img = 'assets/image/blank.png';
      } else {
        bg_img = 'https://swtch.cloud'+ this.profiles[i].listing_images[0];
      }

      let profile_img;

      if(this.profiles[i].author.avatar.thumb){

        profile_img = 'https://swtch.cloud'+ this.profiles[i].author.avatar.thumb ;
      }else{

        profile_img = 'assets/image/avatar.png';
      }

      let rate;
      if(this.profiles[i].additional_price_cents == 0){ rate = "$1.5-2.5/h" }
      else if(this.profiles[i].additional_price_cents == 100) { rate = "$2.5-3.5/h" }
      else if( this.profiles[i].additional_price_cents == 125 ) { rate = "$2.75-3.75/h" }

      content = `<div class="background">
                  <img class="bg" src="`+ bg_img +`" alt="no img">
                  <a class="title" id="title`+ this.profiles[i].id +`">`+ this.profiles[i].title +`</a>
                  <div style="width: 100%;" id="map` + this.profiles[i].id +`">
                    <img class="avatar" src="`+ profile_img + `" alt="No IMG">
                    <span>
                      <p class="name">` + username + `</p>
                      <p>` + rate + `</p>
                    </span>
                  </div>
                </div>`;

      this.addInfoWindow(marker, content, this.profiles[i].id, this.profiles[i].author.id);
    }
  }
  addInfoWindow(marker, content, id, user_id){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {

      if(this.oldInfo){
        this.oldInfo.close();
      }

      this.oldInfo = infoWindow;
       infoWindow.open(this.map, marker);
      setTimeout(() => { infoWindow.close(this.map, marker); }, 5000);
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('title' + id).addEventListener('click', () => {
        this.goUserProfileModal(id, user_id);
      });
      document.getElementById('map' + id).addEventListener('click', () => {
        // this.goUserInfoPage(author_id);
        this.goUserInfoPage(id);
      });
    });
  }

  goUserProfileModal(id, user_id){
    console.log('go UserProfile Page');
    let profileModal = this.modalCtrl.create(UserProfilePage, { id: id, user_id: user_id });
    profileModal.present();
  };

  goUserInfoPage(val){
    console.log('go UserInformation Page');
    let profileModal = this.modalCtrl.create(UserInfoPage, { id: val });
    profileModal.present();
  }

}
