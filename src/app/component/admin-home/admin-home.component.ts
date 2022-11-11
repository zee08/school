import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/currentUser.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public inactive:boolean = true;
  currentUser: any;
  constructor(private currentUserService: CurrentUserService){}

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getUser();
  }
  changeStatus(){
    this.inactive = false;
 }



}
