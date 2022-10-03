import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-volunteer-nav',
  templateUrl: 'volunteer-nav.component.html',
  styleUrls: ['volunteer-nav.component.css']
})

export class VolunteerNavComponent implements OnInit {

  constructor(private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
  }

  isLogin() {
    return this.currentUserService.getLoginStatus();
  }

  logout() {
    this.currentUserService.logout();
    return;
  }
}
