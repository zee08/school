import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
currentUser: any;
  showFiller = false;
  constructor( private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    // if (!this.currentUserService.isAdmin()){
    //   this.router.navigate(['../login']);
    // }


  }

  isLogin() {
    return this.currentUserService.getLoginStatus();
  }

  logout() {
    this.currentUserService.logout();
    return;
  }
}
