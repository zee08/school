import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  username: string;
  role: string;
  userRole = false;
  adminRole = false;
  volunteerRole = false;
constructor(private userService: UserService){}

ngOnInit(){
  // this.authListenerSubs = this.userService.getAuthStatusListener()
  // .subscribe(
  //   isAuthenticated=>{
  //     this.userIsAuthenticated = isAuthenticated;
  //   });





};

// isLogin(){
//   return this.currentUserService.getLoginStatus();
// }

// logout(){
//   this.currentUserService.logout();
//   console.log('logout');
//   return;
// }
ngOnDestroy(){
  this.authListenerSubs.unsubscribe();
}
onViewUsername(username: string){
  this.username = username;
}
}
