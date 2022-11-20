import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../model/admin.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:User [] = [];
  private admins: Admin[]=[];
  private usersUpdated = new Subject<User[]>();
  private adminsUpdated = new Subject<Admin[]>();
  constructor(private http: HttpClient, private router: Router){}

  getUsers(){
    // return this.users;
    this.http.get<{message: string, users: User[]}>('http://localhost:3000/api/users')
    .subscribe((userData)=>{
      this.users = userData.users;
      this.usersUpdated.next([...this.users]);
    })
  }

  getAdmins(){
    // return this.admins;
    this.http.get<{message: string, admins: Admin[]}>('http://localhost:3000/api/admins')
    .subscribe((adminData)=>{
      this.admins = adminData.admins;
      this.adminsUpdated.next([...this.admins]);
    })
  }

  getUserByEmail(email:String){
    let found=this.users.find(i=>i.email === email);
    if (typeof(found)!="undefined"){
      return found;
    }
    return;
  }

  getUserByUsername(username:string){
    let found=this.users.find(i=>i.username === username);
    if (typeof(found)!="undefined"){
      return found;
    }
    return;
  }

  checkUsernameExist(username:String){
    let found=this.users.find(i=>i.username === username);
    if (typeof(found)!="undefined"){
      return true;
    }
    return false;
  }

  addAdmin(userID: String,username: String,password: String,
   fullname: String, email: String,  phone: Number, staffid: String, position: String,  schoolname:String, schoolID:String, city:String) {
    const user:User  = {
      id: null,
      userID:userID,
      username:username,
      password:password,
      fullname:fullname,
      email:email,
      phone: phone,
      staffid:staffid,
      position:position,
      schoolname:schoolname,
      schoolID: schoolID,
      city:city,
      occupation: '',
      dateofbirth:'',
      role: "admin",
    }
    this.http.post<{message:string}>('http://localhost:3000/api/users',user)
      .subscribe((responseData) => {

        console.log(responseData.message);
        this.users.push(user);
        this.usersUpdated.next([...this.users]);

       });
}


  addVolunteer(userID: String,username: String,email: String,
    password: String, fullname: String,
    phone: Number, occupation: String, dateofbirth: String
  ){
      const user:User = {
        id:"",
        userID: userID,
        username:username,
        email:email,
        password:password,
        fullname:fullname,
        phone:phone,
        occupation:occupation,
        position: '',
        dateofbirth:dateofbirth,
        staffid: '',
        schoolname:'',
        schoolID: '',
        city:'',
        role:'volunteer',
      }
      this.http.post<{message:string}>('http://localhost:3000/api/users',user)
      .subscribe((responseData) => {

        console.log(responseData.message);
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
       });

    }
  getUserByID(userID:String){
    let found=this.users.find(i=>i.userID === userID);
    if (typeof(found)!="undefined"){
      return found;
    }
    return;
  }

  getUserUpdateListener()
  {
    return this.usersUpdated.asObservable();
  }

  getAdminUpdateListener()
  {
    return this.adminsUpdated.asObservable();
  }
}
