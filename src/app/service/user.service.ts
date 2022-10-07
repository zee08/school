import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:User [] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(){}

  getUsers(){
    return this.users;
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

  addAdmin(userID: string,username: string,email: string,password: string,
   fullname: string, staffid: string, position: string, occupation:string, dateofbirth:string, schoolID:String) {
    const user:User  = {
      id: "",
      userID:userID,
      username:username,
      email:email,
      password:password,
      fullname:fullname,
      position:position,
      staffid:staffid,
      occupation:occupation,
      dateofbirth:dateofbirth,
      phone: 0,
      schoolID:schoolID,

      role: "admin"
    }
    this.users.push(user);

  }

  addVolunteer(userID: string,username: string,email: string,
    password: string, fullname: string,
    phone: number, occupation: string, dateofbirth: string, position:string, staffid:string, schoolID: String,
  ){
      const user:User = {
        id:"",
        userID:userID,
        username:username,
        email:email,
        password:password,
        fullname:fullname,
        occupation:occupation,
        dateofbirth:dateofbirth,
        phone: 0,
        staffid:staffid,
        position:position,
        schoolID: schoolID,


        role: "volunteer"
      }

        this.users.push(user);

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
}
