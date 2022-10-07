import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from './user.service';

import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private user:User;
  private loginstatus:boolean = false;
  private token: string ="";
  private authStatusListener = new Subject<boolean>();

  constructor(public userservice:UserService,private authService:AuthService,private router:Router){
    this.user ={
      id:"",
      userID:"",
      username:'',
      email:"",
      password:"",
      fullname:"",
      staffid: "",
      position: "",
      occupation:"",
      dateofbirth:"",
      role: "",
      phone:0,
      schoolID:"",


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
    return this.user.fullname
  }

  getUserID(){
    return this.user.userID
  }

  getPassword(){
    return this.user.password
  }

  getSchoolID(){
    return this.user.schoolID
  }

  getStaffID(){
    return this.user.staffid
  }




  getPhone(){
    return this.user.phone
  }



  getLoginStatus(){
    return this.loginstatus
  }

  login(username:string,password:string){
    const authData: User = {username:username, password:password,
      id:"",
      userID:'',
      email:'',
      fullname:"",
      role:"",
      occupation:'',
      dateofbirth:'',
      staffid:"",
      position: "",
      phone:0,
      schoolID:"",

    };
    if (!this.isAdmin()){
              this.router.navigate(['/patient/home']);
              return;
            }
          else if (this.isAdmin()){
            this.router.navigate(['/admin/home']);
            return;
          }



  }

  logout(){
    let user:User ={
      id: "",
      userID:"",
      username:'',
      email:"",
      password:"",
      fullname:"",
      role:"",
      dateofbirth:"",
      occupation:"",
      staffid:"",
      position:"",
      phone:0,
      schoolID:"",

    };
    this.user=user;
    this.loginstatus=false;
    this.token = "";
    this.authService.setToken(this.token);
    this.authStatusListener.next(false);
    return;
  }

  isAdmin(){
    if (typeof(this.user)!="undefined"){
      if (this.user.role ==="admin")
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


  setPassword(password:string){
    this.user.password = password;
    return;
  }

  setPhone(phone:number){
    this.user.phone = phone;
    return;
  }

}
