import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent  {
  public inactive:boolean = true;
  constructor(){

  }
  changeStatus(){
    this.inactive = false;
 }



}
