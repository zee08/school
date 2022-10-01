import { Component, OnInit } from '@angular/core';
import { Batch, Tutorial } from 'src/app/model/batch.model';
import { VaccineService } from 'src/app/service/vaccine.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Vaccine } from 'src/app/service/vaccine.service';
import { Vaccination } from 'src/app/model/vaccination.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-admin-request',
  templateUrl: 'admin-request.component.html',
  styleUrls: ['admin-request.component.css']
})

export class AdminRequestComponent implements OnInit {
  batches:Batch[] = [];
  vaccines:Vaccine[] = [];
  tutorials: Tutorial[]=[];

  constructor(public vaccineService:VaccineService,
    public currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    this.vaccines = this.vaccineService.getVaccines();
    this.tutorials=this.vaccineService.getTutorials();


  }
  ngOnDestroy(){

  }
  onAddPost(form: NgForm){

    if(form.invalid){
      return;
    }
    this.vaccineService.addTutorial(form.value.description,
      form.value.date, form.value.time, form.value.numOfStudents,
      form.value.studentLevel, form.value.status)
  }

  getTotalBatches(vaccine:Vaccine) {
    return this.vaccineService.getTotalBatches(vaccine,this.currentUserService.getCentreID());
  }
}
