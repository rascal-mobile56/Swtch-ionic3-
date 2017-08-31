import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "./base-service";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    public http: Http,
    public baseService: BaseService
  ) {
  }

  getProfiles(){
    return this.http.get(this.baseService.baseUrl + "listings")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getProfileData(id){
    console.log(this.baseService.baseUrl + "listings/" + id);
    return this.http.get(this.baseService.baseUrl + "listings/" + id)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  callbackData(accessToken){
    return this.http.get(this.baseService.callbackUrl + "?mobile=true&access_token=" + accessToken)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getPersonData(person_id){
    console.log(this.baseService.peopleUrl + person_id);
    return this.http.get(this.baseService.peopleUrl + person_id)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  updatePersonData(person_id, body){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(this.baseService.peopleUrl + person_id + '?' +body);
    return this.http.patch(this.baseService.peopleUrl + person_id + '?' + body, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getCarDetailsData(person_id){
    return this.http.get(this.baseService.peopleUrl + person_id + '/car_details/new')
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  updateCarDetailsData(person_id, body, car_id){
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(this.baseService.peopleUrl + person_id + '/car_details/' + car_id+ '?' + body)
    return this.http.post(this.baseService.peopleUrl + person_id + '/car_details?' + body, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getInboxData(person_id){
    let url = this.baseService.peopleUrl + person_id + '/inboxes';
    console.log(url);
    return this.http.get(url)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getTransactionsData(person_id, id){
    let url = this.baseService.peopleUrl + person_id + '/transactions/' + id;
    console.log(url);
    return this.http.get(url)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getConversationsData(person_id, id){
    let url = this.baseService.peopleUrl + person_id + '/conversations/' + id;
    console.log(url);
    return this.http.get(url)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getBookingData(id, params){
    let url = this.baseService.baseUrl + 'listings/' + id + '/initiate?' + params;
    console.log(url);
    return this.http.get(url)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  uploadBookingData(id, params){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this.baseService.baseUrl + 'listings/' + id + '/initiated?' + params;
    console.log(url);
    return this.http.post(url, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

}
