import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, AlertController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { UserInfoPage } from '../user-info/user-info';
import { UserProfilePage } from '../user-profile/user-profile';
import { UserService } from '../../providers/user-service';



declare var google;

@Component({
  selector: 'page-home-tab',
  templateUrl: 'home-tab-page.html'
})
export class HomeTabPage {

  @ViewChild('map') mapElement: ElementRef;
    map: any;
    profiles:any=[];
    length:string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public userService: UserService,
  ) {
    }
  ionViewDidLoad(){
      this.getMainData();
      this.loadMap();
    }

  getMainData(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.getProfiles()
      .subscribe(
        (data) => {
          if(data.success == false){
            console.log("No data");
         }else{
           this.profiles = data;
           console.log(this.profiles);
           loading.dismiss();
           this.addMarker();
         }
        },
        (error) => {
          console.log(error);
      });
  }

  loadMap() {
    let latLng = new google.maps.LatLng(43.691657, -79.521701);

    let mapOptions = {
      center: latLng,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(){
    console.log("this.map.getCenter()", this.map.getCenter());

    for(let i = 0; i<this.profiles.length; i++){
      let latLng1 = new google.maps.LatLng(this.profiles[i].location.latitude, this.profiles[i].location.longitude);
      console.log("latLng1", latLng1);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng1,
        icon: 'assets/icon/maker.png',
      });
      let content;
      let title = this.profiles[i].title;
      let username;
      if( this.profiles[i].author.family_name || this.profiles[i].author.given_name ){
        username =  this.profiles[i].author.family_name +" " + this.profiles[i].author.given_name;
      } else{
        username = this.profiles[i].author.username;
      }
      let bg_img;

      if(this.profiles[i].listing_images.length>0){
          // this.profile[i].listing_images.image_file_name
          bg_img = 'https://swtch.cloud/system/images/'+ this.profiles[i].listing_images[0].id +'/small_3x2/' + this.profiles[i].listing_images[0].image_file_name;

      } else{
        bg_img = 'assets/image/bg1.png';
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
      setTimeout(() => { infoWindow.close(this.map, marker); }, 2500);
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
    // this.navCtrl.push(UserProfilePage,{
    //   id: val,
    // });
  };
  goUserInfoPage(val){
    console.log('go UserInformation Page');
    this.navCtrl.push(UserInfoPage,{
      id: val,
    });
  }

}
