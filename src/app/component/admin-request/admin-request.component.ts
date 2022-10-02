import { Component, OnInit } from '@angular/core';
import { Resource, Tutorial } from 'src/app/model/resource.model';
import { RequestService } from 'src/app/service/request.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Vaccine } from 'src/app/service/request.service';
import { Vaccination } from 'src/app/model/vaccination.model';
import { NgForm, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-admin-request',
  templateUrl: 'admin-request.component.html',
  styleUrls: ['admin-request.component.css']
})

export class AdminRequestComponent implements OnInit {
  resources:Resource[] = [];
  vaccines:Vaccine[] = [];
  tutorials: Tutorial[]=[];



  constructor(public requestService:RequestService,
    public currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    this.resources = this.requestService.getResources();
    this.tutorials=this.requestService.getTutorials();
    //this.vaccines = this.vaccineService.getVaccines();


  }
  ngOnDestroy(){

  }
  onAddPost(form: NgForm){

    if(form.invalid){
      return;
    }
    this.requestService.addTutorial(form.value.description,
      form.value.date, form.value.time, form.value.numOfStudents,
      form.value.studentLevel, form.value.status)
  }

  onAddResource(form: NgForm){

    if(form.invalid){
      return;
    }
    this.requestService.addResource(form.value.description,
      form.value.quantity, form.value.resourceType);
  }


  // getTotalBatches(vaccine:Vaccine) {
  //   return this.vaccineService.getTotalResources(vaccine,this.currentUserService.getCentreID());
  // }
}
