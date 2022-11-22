import { User } from '../model/user.model';
import { School } from '../model/school.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core'; //Get the post model
import { Router } from '@angular/router';
import { Offer } from '../model/offer.model';
import { Request } from '../model/resource.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})

export class ReqService{ //Create a account class

  private users:User[]=[]; //Set type to Account array(model) and assign to empty array
  private schools:School[]=[]; //Set type to School array(model) and assign to empty array
  private request:Request[]=[]; //Set type to Requesy array(model) and assign to empty array
  private offer:Offer[]=[];
  requests:Request;
  private requestsUpdated = new Subject<Request[]>();
  private schoolsUpdated = new Subject<School[]>();
  private usersUpdated = new Subject<User[]>();
  private offerUpdated = new Subject<Offer[]>();

  constructor(private http: HttpClient, private router:Router){}

  //to retrieve the post
  getUsers(){
    // return this.users;
    this.http.get<{message: string, users: User[]}>('http://localhost:3000/api/users')
    .subscribe((userData)=>{
      this.users = userData.users;
      this.usersUpdated.next([...this.users]);
    })
  }

  getUserUpdateListener(){
    return this.usersUpdated.asObservable();
  }

  getSchoolUpdateListener(){
    return this.schoolsUpdated.asObservable();
  }
  getOfferUpdateListener(){
    return this.offerUpdated.asObservable();
  }
  getschools(){
    //return this.schools;
    this.http.get<{message: String, schools: School[]}>('http://localhost:3000/api/schools')
    .subscribe((schoolData)=>{
      this.schools = schoolData.schools;
      this.schoolsUpdated.next([...this.schools]);
    })

  }
  getOffers(){
    this.http.get<{message:String, offers:any}>('http://localhost:3000/api/offers')
    .pipe(map((offerData)=>{
      return offerData.offers.map((offer:
        {_id:any, offerID:any, request:any, offerDate:Date, username:any,
        status:any, remarks:any})=>{
          return{
            id:offer._id,
            offerID:offer.offerID,
            reqId:offer.request,
            offerDate:offer.offerDate,
            username:offer.username,
            status:offer.status,
            remarks:offer.remarks
          };
        });
    }))
    .subscribe((Transformedoffers)=>{
      this.offer = Transformedoffers;
      this.offerUpdated.next([...this.offer]);
    })
  }
  // addSchool(schoolname: string, schooladdress: string, city: string){ // method to add account with arguments
  //   const school: School = {schoolID: null as any, schoolname: schoolname, address: schooladdress, city:city}
  //   this.http
  //   .post<{message: string}>('http://localhost:3000/api/schools',school)
  //   .subscribe((responsedata)=>{
  //     this.school.push(school);
  //     this.schoolsUpdated.next([...this.school]);
  //   })
  // }



  getRequest(){
    this.http.get<{message: string, requests: any}>('http://localhost:3000/api/requests')
    .pipe(map((requestData)=> {
      return requestData.requests.map(request =>{
        return{
          reqID:request.reqID,
      description: request.description,
      quantity:request.quantity,
      resourceType:request.resourceType,
      tutDescription:request.tutDescription,
      tutdate:request.tutdate,
      time:request.time,
      studentLevel: request.studentLevel,
       numOfStudents: request.numOfStudents,
       reqDate:request.reqDate,
       schoolname:request.schoolname,
       schoolID:request.schoolID,
       city:request.city,
       status: request.status,
        remarks:request.remarks,
      reqType:request.reqType,
          id: request._id,
        };
      });
    }))
    .subscribe((transformedRequests)=>{
      this.request = transformedRequests;
      this.requestsUpdated.next([...this.request]);
    })
    //return this.request;
  }
getReqType(){
  return this.requests.reqType;
}
  getRequestUpdateListener(){
    return this.requestsUpdated.asObservable();
  }
  getRequests(id: string){
    return {...this.request.find(p=>p.id === id)};
  }

  AddRequest(reqID:String, description: string,quantity:number, resourceType:string, tutDescription:string, tutdate:Date,
     time:string, studentLevel: string, numOfStudents: number, reqDate:Date, schoolname:string, schoolID:string,
      city:string, status: string, remarks:String, reqType:string, username:string){ // method to add account with arguments
    const request: Request = {
      id: null ,
      reqID:reqID,
      description: description,
      quantity:quantity,
      resourceType:resourceType,
      tutDescription:tutDescription,
      tutdate:tutdate,
      time:time,
      studentLevel: studentLevel,
       numOfStudents: numOfStudents,
       reqDate:reqDate,
       schoolname:schoolname,
       schoolID:schoolID,
       city:city,
       status: status,
        remarks:remarks,
      reqType:reqType,
    username:username}; // variable storing values of account
    this.http
    .post<{message:string, reqId:string}>('http://localhost:3000/api/requests', request)
    .subscribe((responseData)=>{
      const id = responseData.reqId;
      request.id = id;
    this.request.push(request); // push the nre post into account array
    this.requestsUpdated.next([...this.request]);
    });
  }

  updateRequest( id:string, reqDate:Date, remarks:String, username:string){
    const request: Request = {
     id: id,
     reqID:'',
      description: '',
      quantity:0,
      resourceType:'',
      tutDescription:'',
      tutdate:null,
      time:'',
      studentLevel: '',
       numOfStudents: 0,
       reqDate:reqDate,
       schoolname:'',
       schoolID:'',
       city:'',
       status: 'Pending',
        remarks:remarks,
      reqType:'',
    username:username
  };
    this.http.put('http://localhost:3000/api/requests/'+ id, request)
    .subscribe(response => {
      const updateRequest = [...this.request];
      const oldPostIndex = updateRequest.findIndex(p=> p.id===request.id);
      updateRequest[oldPostIndex] = request;
      this.request = updateRequest;
      this.requestsUpdated.next([...this.request]);

    });
  }

  deleteResource(reqId:string){
    this.http.delete('http://localhost:3000/api/requests/'+reqId)
    .subscribe(()=> {
      const updateRequest = this.request.filter(request =>request.id !== reqId);
      this.request = updateRequest;
      this.requestsUpdated.next([...this.request]);

    });
  }
}
