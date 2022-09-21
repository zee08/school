import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private user:User;
  private loginstatus:boolean = false;
  private token: string ="";
  private authStatusListener = new Subject<boolean>();

  constructor(public userService:UserService,private http:HttpClient,private router:Router){
    this.user ={
      id:"",
      userID:'',
      username:'',
      email:"",
      password:"",
      name:"",
      acctype:"",
      centreID:"",
      staffID:"",
      ID:"",
      IDno: "",
      IDtype:"",
      phone:0,
      first:false,
    };
  }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getUser() {
    return this.user;
  }

  getUsername() {
    return this.user.username
  }

  getEmail() {
    return this.user.email
  }

  getName(){
    return this.user.name
  }

  getUserID(){
    return this.user.userID
  }

  getPassword(){
    return this.user.password
  }

  getCentreID(){
    return this.user.centreID
  }

  getStaffID(){
    return this.user.staffID
  }

  getID(){
    return this.user.IDno
  }

  getIDType(){
    return this.user.IDtype
  }

  getPhone(){
    return this.user.phone
  }

  getFirst(){
    return this.user.first
  }

  getLoginStatus(){
    return this.loginstatus
  }

  login(email:String,password:String){
    const authData: User = {email:email, password:password,
      id:"",
      userID:'',
      username:'',
      name:"",
      acctype:"",
      centreID:"",
      staffID:"",
      ID:"",
      IDno: "",
      IDtype:"",
      phone:0,
      first:false,
    };
    this.http.post <{token:string,user: User}>('http://localhost:3000/api/users/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        //this.authService.setToken(token);
        this.authStatusListener.next(true);
        this.loginstatus=true;
        this.user = response.user;
        if (!this.isAdmin()){
            this.router.navigate(['/patient/home']);
            return;
          }
        else if (this.isAdmin()){
          this.router.navigate(['/admin/home']);
          return;
        }
      });


  }

  logout(){
    let user:User ={
      id: "",
      userID:'',
      username:'',
      email:"",
      password:"",
      name:"",
      acctype:"",
      centreID:"",
      staffID:"",
      ID:"",
      IDno: "",
      IDtype:"",
      phone:0,
      first:false,
    };
    this.user=user;
    this.loginstatus=false;
    this.token = "";
    //this.authService.setToken(this.token);
    this.authStatusListener.next(false);
    return;
  }

  isAdmin(){
    if (typeof(this.user)!="undefined"){
      if (this.user.acctype ==="admin")
        return true;
      return false;
    }
    return false;
  }

  checkPassword(Password:String, user:User){
    if(user.password === Password){
      return true;
    }
    return false;
  }


  setPassword(password:String){
    this.user.password = password;
    return;
  }

  setPhone(phone:number){
    this.user.phone = phone;
    return;
  }

  setFirst(){
    this.user.first = true;
    return;
  }
}
