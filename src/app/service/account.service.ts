import { User } from '../model/user.model';
import { School } from '../model/school.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core'; //Get the post model
import { Router } from '@angular/router';

import { Request } from '../model/resource.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { createInjectableType } from '@angular/compiler';


@Injectable({providedIn: 'root'})

export class AccService{ //Create a account class

  private user:User[]=[]; //Set type to Account array(model) and assign to empty array
  private school:School[]=[]; //Set type to School array(model) and assign to empty array
  private request:Request[]=[]; //Set type to Requesy array(model) and assign to empty array

  private requestsUpdated = new Subject<Request[]>();
  private schoolsUpdated = new Subject<School[]>();
  private userUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router:Router){}

  //to retrieve the post
  getUser(){
    this.http.get<{message: string, user: any}>('http://localhost:3000/api/user')
    .pipe(map((userData)=>{
      return userData.user.map(user =>{
        return{
          email: user.email,
          password: user.password,
          fullName: user.fullName,
          phone: user.phone,
          occupation: user.occupation,
          dob: user.dob,
          staffID: user.staffID,
          position: user.position,
          role: user.role
        };
      });
    }))
    .subscribe((transformedUser)=>{
      this.user = transformedUser;
      this.userUpdated.next([...this.user]);
    })// creating new array by copying the old array
  }

  getUserUpdateListener(){
    return this.userUpdated.asObservable();
  }


  getSchool(){
    this.http.get<{message: string, school: any}>('http://localhost:3000/api/schools')
    .pipe(map((schoolData)=>{
      return schoolData.school.map(school =>{
        return{
          schoolname: school.schoolname,
          schooladdress: school.schooladdress,
          city: school.city
        };
      });
    }))
    .subscribe((transformedSchool)=>{
      this.school = transformedSchool;
      this.schoolsUpdated.next([...this.school]);
    })// creating new array by copying the old array
  }

  addSchool(schoolname: string, schooladdress: string, city: string){ // method to add account with arguments
    const school: School = {schoolID: null as any, schoolname: schoolname, address: schooladdress, city:city}
    this.http
    .post<{message: string}>('http://localhost:3000/api/schools',school)
    .subscribe((responsedata)=>{
      this.school.push(school);
      this.schoolsUpdated.next([...this.school]);
    })
  }



  getRequest(){
    this.http.get<{message: string, requests: any}>('http://localhost:3000/api/requests')
    .pipe(map((requestData)=> {
      return requestData.requests.map(request =>{
        return{
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
          reqID: request._id
        };
      });
    }))
    .subscribe((transformedRequests)=>{
      this.request = transformedRequests;
      this.requestsUpdated.next([...this.request]);
    })
    //return this.request;
  }

  getRequestUpdateListener(){
    return this.requestsUpdated.asObservable();
  }

  AddRequest( description: string,quantity:number, resourceType:string, tutDescription:string, tutdate:Date,
     time:string, studentLevel: string, numOfStudents: number, reqDate:Date, schoolname:string, schoolID:string,
      city:string, status: string, remarks:String, reqType:string){ // method to add account with arguments
    const request: Request = {
      reqID: null as any,
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
      reqType:reqType}; // variable storing values of account
    this.http
    .post<{message:string}>('http://localhost:3000/api/requests', request)
    .subscribe((responseData)=>{
    this.request.push(request); // push the nre post into account array
    this.requestsUpdated.next([...this.request]);
    });
  }

  updateRequest(reqID:string, description: string,quantity:number, resourceType:string, tutDescription:string, tutdate:Date,
    time:string, studentLevel: string, numOfStudents: number, reqDate:Date, schoolname:string, schoolID:string,
     city:string, status: string, remarks:String, reqType:string){
    const request: Request = {
      reqID: reqID,
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
      reqType:reqType};
    this.http.put('http://localhost:3000/api/requests/'+ reqID, request)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }
}
