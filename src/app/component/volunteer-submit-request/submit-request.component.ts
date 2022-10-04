import { Component, OnInit } from '@angular/core';
import { Resource, Tutorial } from 'src/app/model/request.model';
import { RequestService } from 'src/app/service/request.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Vaccine } from 'src/app/service/request.service';
import { Vaccination } from 'src/app/model/vaccination.model';
import { NgForm, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-volunteer-request',
  templateUrl: 'submit-request.component.html',
  styleUrls: ['submit-request.component.css']
})

export class SubmitRequestComponent implements OnInit {
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
      form.value.studentLevel, form.value.status, form.value.centreID)
  }

  onAddResource(form: NgForm){

    if(form.invalid){
      return;
    }
    this.requestService.addResource(form.value.description,
      form.value.quantity, form.value.resourceType, form.value.centreID);

  }


  // getTotalBatches(vaccine:Vaccine) {
  //   return this.vaccineService.getTotalResources(vaccine,this.currentUserService.getCentreID());
  // }
}
