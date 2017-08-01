import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProfileEditPage }  from '../profile-edit/profile-edit';
import { AccountPage }  from '../account/account';
import { CarDetailsPage }  from '../car-details/car-details';
import { PaymentPage}  from '../payment/payment';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {


  public profile_img:any;
  public person:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userService: UserService,

  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }
  ngOnInit(){

    // let person_id = window.localStorage.getItem('person_id');
    let person_id= "F2z8qVPuveLvUgsIJN1wXw";
    console.log('person_id', person_id);
    this.getPersonData(person_id);
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
         }else{
           console.log(data);
           this.person = data;
         }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      });
  }


  goEditProfilePage(){
    console.log("ProfileEditPage");
    this.navCtrl.push(ProfileEditPage,{
      address: "Tokyo",
    });
  }
  goAccountPage(){
    console.log("AccountPage");
    this.navCtrl.push(AccountPage);
  }
  goCarDetailsPage(){
    console.log("CarDetailsPage");
    this.navCtrl.push(CarDetailsPage);
  }
  goPaymentPage(){
    console.log("PaymentPage");
    this.navCtrl.push(PaymentPage);
  }

//   age_range: {min: 21}
// clientID: "HEquc9M0z77mjVUPAHv7qyxDJx12UF4G"
// context: {mutual_likes: {data: [], summary: {total_count: 0}}, id: "dXNlcl9jb250ZAXh0OgGQCDFXErTrWZBiubhYIPchAgXX9DGEg…5UtCjc3sehFF5QpRLovva99v5SHbUjFAOeHZBkvuLLPZAFQZD"}
// cover: {id: "149273645443982", offset_x: 0, offset_y: 0, source: "https://scontent.xx.fbcdn.net/v/t31.0-0/p480x480/1…g?oh=a4a6b09819c7d56bdf6bdfba04a63d91&oe=59F9FCB5"}
// created_at: "2017-06-29T01:50:56.023Z"
// email: "minorumadamr@hotmail.com"
// email_verified: true
// family_name: "Kobayashi"
// gender: "male"
// given_name: "Minoru"
// identities: [Object] (1)
// installed: true
// is_verified: false
// link: "https://www.facebook.com/app_scoped_user_id/433152103722800/"
// locale: "en_US"
// name: "Minoru Kobayashi"
// name_format: "{first} {last}"
// nickname: "minorumadamr"
// picture: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/17553827_389111524793525_6896909797947105555_n.jpg?oh=787667513731359355f8c4412ead7534&oe=5A11…"
// picture_large: "https://scontent.xx.fbcdn.net/v/t1.0-1/17553827_389111524793525_6896909797947105555_n.jpg?oh=5c6b7f74f1cd698352701d3151bc4c44&oe=5A0B231B"
// sub: "facebook|433152103722800"
// third_party_id: "qrB2mP9MFZg65-AKaNuZLQM0nUU"
// timezone: 9
// updated_at: "2017-07-21T07:53:28.910Z"
// updated_time: "2017-03-27T02:30:35+0000"
// user_id: "facebook|433152103722800"
// user_metadata: {}
// verified: true




}
