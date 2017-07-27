import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, ModalController, LoadingController, FabContainer } from 'ionic-angular';
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
    accessToken:any;
    length:string;
    openState:string;
    currentLat:number;
    currentLng:number;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public userService: UserService,
    private geolocation: Geolocation,
  ) {

    // this.person = JSON.parse(window.localStorage.getItem('profile'));
    // console.log(this.person);
    }

  ionViewWillEnter(){
    this.person = JSON.parse(window.localStorage.getItem('profile'));
    console.log(this.person);
    this.accessToken = JSON.parse(window.localStorage.getItem('access_token'));
    if(this.accessToken){
      this.getCallbackData(this.accessToken);
    }else{
      this.getMainData();
    }
  }

  getCallbackData(token){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.callbackData(token)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
            this.getMainData();
         }else{
           console.log(data);
           window.localStorage.setItem('person_id', data.api.person_id);
           this.getMainData();
         }
      },
      (error) => {
        console.log(error);
      });
  }

  goListChargerPage(fab: FabContainer){
    console.log('goListChargerPage');
    if (fab !== undefined) {
      fab.close();
    }
    this.navCtrl.push(ListChargerPage);
  }

  goSignPage(fab: FabContainer){
    console.log('goSignPage');
    if (fab !== undefined) {
      fab.close();
    }
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
           this.profiles = data;
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

      let latLng = new google.maps.LatLng(this.profiles[i].location.latitude, this.profiles[i].location.longitude);
      if(this.profiles[i].open == true){
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
      // let title = this.profiles[i].title;
      let username;
      if( this.profiles[i].author.family_name || this.profiles[i].author.given_name ){

        username =  this.profiles[i].author.family_name +" " + this.profiles[i].author.given_name;
      } else{

        username = this.profiles[i].author.username;
      }
      let bg_img;

      if(this.profiles[i].listing_images.length>0){

          bg_img = 'https://swtch.cloud/system/images/'+ this.profiles[i].listing_images[0].id +'/small_3x2/' + this.profiles[i].listing_images[0].image_file_name;
      } else{

        bg_img = 'assets/image/bg_small.png';
      }

      let profile_img;

      if(this.profiles[i].author.image_file_name){

        profile_img = 'https://swtch.cloud/system/images/'+ this.profiles[i].author.id +'/thumb/' + this.profiles[i].author.image_file_name;
      }else{

        profile_img = 'assets/image/avatar.png';
      }
      content = `<div class="background">
                  <img class="bg" src="`+ bg_img +`" alt="no img">
                  <a class="title" id="title`+ this.profiles[i].id +`">`+ this.profiles[i].title +`</a>
                  <div style="width: 100%;" id="map` + this.profiles[i].id +`">
                    <img class="avatar" src="`+ profile_img + `" alt="No IMG">
                    <span>
                      <p class="name">` + username + `</p>
                      <p>$2.5~3.5/h</p>
                    </span>
                  </div>
                </div>`;

      this.addInfoWindow(marker, content, this.profiles[i].id);
    }
  }
  addInfoWindow(marker, content, id){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      setTimeout(() => { infoWindow.close(this.map, marker); }, 4000);
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('title' + id).addEventListener('click', () => {
        this.goUserProfileModal(id);
      });
      document.getElementById('map' + id).addEventListener('click', () => {
        this.goUserInfoPage(id);
      });
    });
  }
  goUserProfileModal(val){
    console.log('go UserProfile Page');
    let profileModal = this.modalCtrl.create(UserProfilePage, { id: val });
    profileModal.present();
  };
  goUserInfoPage(val){
    console.log('go UserInformation Page');
    let profileModal = this.modalCtrl.create(UserInfoPage, { id: val });
    profileModal.present();
  }

}
