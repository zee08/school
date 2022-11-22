import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { Offer } from '../model/offer.model';
import { Request } from '../model/resource.model';
import { User } from '../model/user.model';
import { SchoolService } from './school.service';
import { ReqService } from './request.service';
import { HttpClient } from '@angular/common/http';
import { School } from '../model/school.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class OfferService{

  private offers: Offer[]=[];
  private request:Request[]=[];
  private offerUpdate = new Subject<Offer[]>();

  constructor(public schoolService:SchoolService, public reqService:ReqService,
    private http: HttpClient ){}


getOffers(){
  this.http.get<{message:String, offers:any}>('http://localhost:3000/api/offers')
  .pipe(map((offerData)=>{
    return offerData.offers.map((offer:
      {_id:any, offerID:any, request:any, offerDate:Date, username:any,
      status:any, remarks:any})=>{
        return{
          id:offer._id,
          offerID:offer.offerID,
          request:offer.request,
          offerDate:offer.offerDate,
          username:offer.username,
          status:offer.status,
          remarks:offer.remarks
        };
      });
  }))
  .subscribe((Transformedoffers)=>{
    this.offers = Transformedoffers;
    this.offerUpdate.next([...this.offers]);
  })
}

getOffer(id:string){
  return {...this.offers.find(p=>p.id === id)};
}

updateOffer(updateOffer: Offer){
  const offer :Offer={
    id: updateOffer.id,
    offerID:updateOffer.offerID,
    request:updateOffer.request,
    offerDate:updateOffer.offerDate,
    username: updateOffer.username,
    status: updateOffer.status,
    remarks: updateOffer.remarks,
  };
  this.http.put('http://localhost:3000/api/offers/'+updateOffer.id, offer)
  .subscribe(response => console.log(response));
}

addOffer(offerID:String, reqType:string,  offerDate:Date,  username:String,
  remarks: String){
    const offer: Offer={
      id: "",
      offerID: offerID,
      request:reqType,
      offerDate:offerDate,
      username:username,
      remarks:remarks,
      status:'Pending',//pending, accept, close
    }
    this.http.post<{message:string, offerId:string}>('http://localhost:3000/api/offers',offer)
    .subscribe((responseData)=>{
      const id = responseData.offerId;
      offer.id = id;
      console.log(responseData.message);
      this.offers.push(offer);
      this.offerUpdate.next([...this.offers]);

    })
}

// checkUserAppointed(reqID:String,user:User) {
//   let appointed = false;
//   for (let i=0;i<this.offers.length;i++){
//     if (this.offers[i].request == reqID){
//       appointed = true;
//     }
//   }
//   return appointed;
// }

acceptOffer(offer:Offer){
  offer.status = "ACCEPTED";
  this.updateOffer(offer);
  this.offerUpdate.next([...this.offers]);
  return;
}

closeOffer(offer:Offer){
  offer.status = "CLOSED";
  this.updateOffer(offer);
  this.offerUpdate.next([...this.offers]);
  return;
}

getOfferUpdateListener()
{
  return this.offerUpdate.asObservable();
}
}
