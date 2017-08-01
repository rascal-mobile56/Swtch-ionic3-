import { Component,  ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var google;

@Component({
  selector: 'page-list-charger',
  templateUrl: 'list-charger.html'
})
export class ListChargerPage {
  @ViewChild('map') mapElement: ElementRef;

    map: any;

    lat:string;
    lng:string;
    currentLat:number;
    currentLng:number;
    address:string = '';
    list_image:any;
    profile_img:any;
    // public weeksFlags=[{mon:false}, {tues:false}]

    weekdays: Array<{weekday: string, dayToggle: boolean, dayCheck: boolean, from: string, to: string }>;
    outlets: Array<{outlet: string, outCheck: boolean}>;
    networks: Array<{network: string, netCheck: boolean}>;
    accepts: Array<{accept: string, acceptCheck: boolean}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private camera: Camera,
  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
    this.address = navParams.get("address");
    this.weekdays = [
      { weekday:'Monday', dayToggle:true, dayCheck:false, from:'', to:''},
      { weekday:'Tuesday', dayToggle:false, dayCheck:false, from:'', to:''},
      { weekday:'Wednesday', dayToggle:false, dayCheck:false, from:'', to:''},
      { weekday:'Thursday', dayToggle:false, dayCheck:false, from:'', to:''},
      { weekday:'Friday', dayToggle:false, dayCheck:false, from:'', to:''},
      { weekday:'Saturday', dayToggle:false, dayCheck:false, from:'', to:''},
      { weekday:'Sunday', dayToggle:false, dayCheck:false, from:'', to:''}
    ];
    this.outlets = [
      {outlet:'EV Plug (J1772)', outCheck:false},
      {outlet:'CCS DCFC', outCheck:false},
      {outlet:'Tesla Supercharger', outCheck:false},
      {outlet:'Wall Outlet(120V)', outCheck:false},
      {outlet:'CHAdeMO DCFC', outCheck:false},
      {outlet:'Tesla Model S / Model X', outCheck:false},
      {outlet:'Tesla HPWC (Roadster)', outCheck:false},
      {outlet:'NEMA 14-50', outCheck:false},
      {outlet:'Mennekes (Type 2)', outCheck:false},
      {outlet:'EV Plug (Type 3)', outCheck:false},
      {outlet:'Wall Outlet(BS1363)', outCheck:false},
      {outlet:'Wall Outlet(EuroPlug)', outCheck:false},
      {outlet:'Blue Commando', outCheck:false},
      {outlet:'Wall Outlet(3112)', outCheck:false},
      {outlet:'Three Phase 32A', outCheck:false},
      {outlet:'Caravan Mains Socket', outCheck:false},
    ];

    this.networks = [
      {network:'Redsidential', netCheck:false},
      {network:'Commercial', netCheck:false},
    ]
    this.accepts = [
      {accept:'Auto Accept', acceptCheck: false}
    ];
  }

  ionViewDidLoad(){
    if(this.address){
      this.searchAddress(this.address);
    }else{
      this.geolocationData();
    }
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
    this.nativeGeocoder.forwardGeocode(address)
      .then((coordinates: NativeGeocoderForwardResult) => this.LatLng(coordinates.latitude, coordinates.longitude))
      .catch((error: any) => console.log(error));
  }

  LatLng(latitude, longitude){
    console.log('The coordinates are latitude=' + latitude + ' and longitude=' + longitude);
    this.lat = latitude;
    this.lng = longitude;
    this.loadMap(this.lat, this.lng);
    this.addMarker();
  }


  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }

 setProfileImage(){
   let options:CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              targetWidth: 100,
              targetHeight: 100
            }
    this.camera.getPicture(options).then((imageData) => {
           // imageData is either a base64 encoded string or a file URI
           // If it's base64:
           let base64Image = 'data:image/jpeg;base64,' + imageData;
           this.list_image = imageData;
           console.log(imageData);
          }, (err) => {
           // Handle error
          });
      }


}
