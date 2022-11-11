import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/model/request.model';
import { ResourceService } from 'src/app/service/resource.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';


import { NgForm, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-volunteer-request',
  templateUrl: 'submit-request.component.html',
  styleUrls: ['submit-request.component.css']
})

export class SubmitRequestComponent implements OnInit {
  resources:Request[] = [];





  constructor(public resourceService:ResourceService,
    public currentUserService:CurrentUserService) { }

  ngOnInit(): void {




  }
  ngOnDestroy(){

  }
  onAddPost(form: NgForm){

    if(form.invalid){
      return;
    }




}
}
