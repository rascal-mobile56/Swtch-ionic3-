import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { UserService } from '../../services/user-service';
import { BaseService } from "../../services/base-service";

declare var google;

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {

  @ViewChild('map') mapElement: ElementRef;

    map: any;

    lat:string;
    lng:string;
    currentLat:number;
    currentLng:number;
    profile:any;
    authResult:any;
    person_id:any;
    person:any = { family_name: '', given_name:'',image:'',phone_number: '',  description:'' };
    location:any = { address:'', google_address: '', latitude: '', longitude:''};
    imagePath:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public  alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private camera: Camera,
    private crop: Crop,
    private transfer: FileTransfer,
    private file: File,
    public userService: UserService,
    public baseService: BaseService,
  ) {
    this.profile = JSON.parse(window.localStorage.getItem('profile'));
    console.log(this.profile);
  }

  ngOnInit(){
    this.person_id = window.localStorage.getItem('person_id');
    // this.person_id= "ckozv7euc19VGaVdnBobbQ";
    console.log(this.person_id);
    this.getPersonData(this.person_id);
  }

  getPersonData(id){
    let loading = this.loadingCtrl.create();
    loading.present();

    this.userService.getPersonData(id)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
            this.locationData(false);
         }else{
           console.log(data);
           this.person = data;
           if(!data.location){
             this.locationData(true);
           } else{
             this.location = data.location;
             this.locationData(false);
           }
         }
      },
      (error) => {
        console.log(error);
      });
  }

  updatePersonData(){
    let body = '&person[family_name]='+ this.person.family_name
    + '&person[given_name]='+ this.person.given_name
    + '&person[description]=' + this.person.description
    + '&person[phone_number]='+ this.person.phone_number
    + '&person[location[address]]=' + this.location.address
    + '&person[location[google_address]]=' + this.location.address
    + '&person[location[latitude]]=' + this.lat.toString() +
    '&person[location[longitude]]=' + this.lng.toString();
      console.log(body);

    let loading = this.loadingCtrl.create();
    loading.present();

    this.userService.updatePersonData(this.person_id, body)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
            // this.locationData(false);
         }else{
           console.log(data);
         }
      },
      (error) => {
        console.log(error);
      });
  }

  locationData(flag){
    if(flag){
      this.geolocationData();
    }else{
      this.searchAddress(this.location.address);
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
    this.geolocationData();
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



   profileImageSelect() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            let options:CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              sourceType: this.camera.PictureSourceType.CAMERA,
            }
            this.camera.getPicture(options).then((imageData) => {
              this.crop.crop(imageData, {quality: 75})
                .then(newImage => {

                  var sourceDirectory = newImage.substring(0, newImage.lastIndexOf('/') + 1);
                  var sourceFileName = newImage.substring(newImage.lastIndexOf('/') + 1, newImage.length);
                  sourceFileName = sourceFileName.split('?').shift();

                  this.imagePath = newImage;
                  this.updatePhoto();
                },error => console.error('Error cropping image', error)
              );
            }, (err) => {
              alert(JSON.stringify(err))
            });
          }
        },{
          text: 'Photo Library',
          handler: () => {
            let options:CameraOptions = {
                quality: 100,
                 destinationType: this.camera.DestinationType.FILE_URI,
                 encodingType: this.camera.EncodingType.JPEG,
                 mediaType: this.camera.MediaType.PICTURE,
                 sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
               }
              this.camera.getPicture(options).then((imageData) => {

                console.log(imageData);
                this.crop.crop(imageData, {quality: 75})
                .then(newImage => {

                  var sourceDirectory = newImage.substring(0, newImage.lastIndexOf('/') + 1);
                  var sourceFileName = newImage.substring(newImage.lastIndexOf('/') + 1, newImage.length);
                  sourceFileName = sourceFileName.split('?').shift();

                  this.imagePath = newImage;
                  let base64Image = 'data:image/jpeg;base64,' + newImage;

                  console.log(base64Image);
                  this.updatePhoto();
                },error=>console.error('Error cropping image', JSON.stringify(error))
                );
               }, (err) => {
                alert(JSON.stringify(err))
               });
             }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

    updatePhoto(){
      let loading = this.loadingCtrl.create();
      loading.present();

      if (this.imagePath){

        let filename = this.imagePath.split('/').pop();
        let options = {
          fileKey: "person[image]",
          fileName: filename,
          chunkedMode: false,
          httpMethod: "PATCH",
          mimeType: "image/jpg",

        };

        const fileTransfer: FileTransferObject = this.transfer.create();

        fileTransfer.upload(this.imagePath, this.baseService.peopleUrl + "/" + this.person_id,
          options).then((entry) => {
            console.log("url: " + this.baseService.peopleUrl + "/" + this.person_id);
            if (JSON.stringify(entry).indexOf("error_code") == -1){
              this.profile.picture = this.imagePath;
              this.imagePath = '';
              loading.dismiss();
              // this.flagService.setChangedFlag(true);
            }
            else{
              loading.dismiss();
              console.log("success:" + JSON.stringify(entry));
            }

          }, (err) => {
            loading.dismiss();
            console.log("failed:" + JSON.stringify(err));
          });
      }
    }


  backPage(){
    this.navCtrl.pop();
  }

}
