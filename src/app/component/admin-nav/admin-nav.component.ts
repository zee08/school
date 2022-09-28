import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/currentUser.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  constructor(private currentUserService: CurrentUserService){}

  logout() {
    this.currentUserService.logout();
    return;
  }
}
