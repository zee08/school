import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit{
  showFiller = false;
  userName: String;
  currentUser: any;

  constructor(private router:Router, private currentUserService: CurrentUserService,
    private userService: UserService){}



  ngOnInit(){
    this.currentUser = this.currentUserService.getUser();

  }
  isLogin() {
    return this.currentUserService.getLoginStatus();
  }

  logout() {
    this.currentUserService.logout();
    return;
  }
  getUser(){
    this.currentUserService.getUsername();
  }
}
