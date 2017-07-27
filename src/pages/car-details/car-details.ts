import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-car-details',
  templateUrl: 'car-details.html'
})
export class CarDetailsPage {

  carDetails:any = { maker:'', year:'', model:'', colour:'', license_plate_number:''}
  person_id:any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public userService: UserService,

  ) {
  }
  ngOnInit(){
    this.person_id = window.localStorage.getItem('person_id');
    // this.person_id= "ckozv7euc19VGaVdnBobbQ";
    console.log(this.person_id);
    this.getCarDetailsData(this.person_id);
  }

  getCarDetailsData(id){
    let loading = this.loadingCtrl.create();
    loading.present();

    this.userService.getCarDetailsData(id)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
         }else{
           console.log(data);
           this.carDetails = data;
         }
      },
      (error) => {
        console.log(error);
      });
  }
  updateCarDetails(id){
    let loading = this.loadingCtrl.create();
    loading.present();

    let body = 'car_detail[maker]=' + this.carDetails.maker +
    '&car_detail[year]=' + this.carDetails.year +
    '&car_detail[model]=' + this.carDetails.model +
    '&car_detail[colour]=' + this.carDetails.colour +
    '&car_detail[license_plate_number]=' + this.carDetails.license_plate_number;

    this.userService.updateCarDetailsData(id, body)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
         }else{
           console.log(data);
           this.carDetails = data;
         }
      },
      (error) => {
        console.log(error);
      });
  }

}
