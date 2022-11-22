import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, TitleStrategy } from '@angular/router';
import { Admin } from '../model/admin.model';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
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
    private http:HttpClient, private webService: WebRequestService)
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
      schoolname: "",
      schoolID:"",
      city:"",
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
getCity(){
  return this.user.city;
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
      schoolname: "",
      schoolID:"",
      city:"",
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
          console.log(this.getUser())
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
      schoolname: "",
      schoolID:"",
      city:"",
      role:"",

    };

    this.token =null;
this.user=user;
    this.authStatusListener.next(false);

    this.router.navigate(['/']);

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
  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }
  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }
  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }
  getUserId() {
    return localStorage.getItem('user-id');
  }
  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }

}
