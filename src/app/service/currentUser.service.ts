import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from 'backend/auth/auth.service';
import { Router, TitleStrategy } from '@angular/router';
import { Admin } from '../model/admin.model';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private user:User;
  userRole :string;
  private loginstatus:boolean = false;
  private loggedUser = new BehaviorSubject<User>(<User>{});
  private token: string ="";
  private authStatusListener = new Subject<boolean>();

  constructor(public userservice:UserService,private authService:AuthService,private router:Router,
    private http:HttpClient)
    {
    this.user ={
      id:"",
      userID:"",
      username:'',
      password:"",
      fullname:"",
      email:"",
      phone:0,
      occupation:"",
      position: "",
      dateofbirth:"",
      staffid: "",
      schoolID:"",
      schoolname: "",
      role: "",
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

  getFullName(){
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

  getSchoolname() {
    return this.user.schoolname;
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




  login(username:String,password:String){
    const authData: User = {username:username, password:password,
      id:"",
      userID:'',
      fullname:"",
      email:'',
      phone:0,
      occupation:'',
      position: '',
      dateofbirth:'',
      staffid:"",
      schoolID:"",
      schoolname: "",
      role:"",
    };
    this.http.post <{token:string,user: User}>('http://localhost:3000/api/users/login', authData)
    .subscribe(response => {

      const token = response.token;
      this.token = token;
      this.authService.setToken(token);
      this.authStatusListener.next(true);
      this.loggedUser.next(this.user);
      this.loginstatus=true;
      this.user = response.user;

      if (!this.isAdmin()){
          this.router.navigate(['/volunteer/home']);
          return;
        }
      else if(this.isAdmin()){
        this.router.navigate(['/admin/home']);
        return;
      }
    });

  }
  getUserName(){
    return this.loggedUser.getValue().username;
  }
  // loginAdmin(username:String,password:String){
  //   const authAdminData: Admin = {username:username, password:password,
  //     id:"",
  //     userID:'',
  //     email:'',
  //     fullname:"",
  //     role:"",
  //     staffid:"",
  //     position: "",
  //     phone:0,
  //     schoolID:"",

  //   };
  //   this.http.post <{token:string,admin: Admin}>('http://localhost:3000/api/admins/login', authAdminData)
  //   .subscribe(response => {
  //     const token = response.token;
  //     this.token = token;
  //     this.authService.setToken(token);
  //     this.authStatusListener.next(true);
  //     this.loginstatus=true;
  //     this.admin = response.admin;
  //     this.router.navigate(['/admin/home']);

  //   });
  // }


  logout(){
    let user:User ={
      id:"",
      userID:'',
      username:'',
      password:'',
      fullname:"",
      email:'',
      phone:0,
      occupation:'',
      position: '',
      dateofbirth:'',
      staffid:"",
      schoolID:"",
      schoolname: "",
      role:"",

    };
    this.user=user;
    this.loginstatus=false;
    this.token = "";
    this.authService.setToken(this.token);
    this.authStatusListener.next(false);
    return;
  }

  // logoutAdmin(){
  //   let admin:Admin ={
  //     id: "",
  //     userID:"",
  //     username:'',
  //     email:"",
  //     password:"",
  //     fullname:"",
  //     role:"",
  //     //dateofbirth:"",
  //     //occupation:"",
  //     staffid:"",
  //     position:"",
  //     phone:0,
  //     schoolID:"",

  //   };
  //   this.admin=admin;
  //   this.loginstatus=false;
  //   this.token = "";
  //   this.authService.setToken(this.token);
  //   this.authStatusListener.next(false);
  //   return;
  // }

  isAdmin(){
    if(typeof(this.user)!="undefined"){
      if(this.user.role === "admin")
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
  checkPasswordAdmin(Password:String, admin:User){
    if(admin.password === Password){
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

}
