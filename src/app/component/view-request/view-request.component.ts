import { Component, OnInit } from '@angular/core';
//import { Request } from 'src/app/model/request.model';
//import { RequestService } from 'src/app/service/request.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
//import { Vaccine } from 'src/app/service/request.service';

import { NgForm, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-view-request',
  templateUrl: 'view-request.component.html',
  styleUrls: ['view-request.component.css']
})

export class ViewRequestComponent {
  resources:Request[] = [];





  constructor() { }
onAddPost(form: NgForm){

}
}
