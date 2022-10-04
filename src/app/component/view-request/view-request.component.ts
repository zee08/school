import { Component, OnInit } from '@angular/core';


import { RequestService } from 'src/app/service/request.service';
import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Vaccination } from 'src/app/model/vaccination.model';

import { UserService } from 'src/app/service/user.service';

import { Tutorial } from 'src/app/model/request.model';
import { Resource} from 'src/app/model/request.model';

import { Vaccine } from 'src/app/service/request.service';
import { NgForm, FormControl, FormBuilder } from "@angular/forms";




@Component({
  selector: 'app-view-request',
  templateUrl: 'view-request.component.html',
  styleUrls:['view-request.component.css']
})


export class ViewRequestComponent implements OnInit {
  vaccinations: Vaccination[]=[];
  tutorials:Tutorial[]=[];
  vacName:String="";
  resources:Resource[] = [];
  request:Resource[] = [];


  constructor( public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public requestService:RequestService,public userService:UserService,
     ) { }


  ngOnInit(): void {

    this.resources = this.requestService.getResources();
    this.tutorials=this.requestService.getTutorials();
    //this.vaccines = this.vaccineService.getVaccines();
  }





  onAddResource(form: NgForm){

    if(form.invalid){
      return;
    }
    this.requestService.addTutorial(form.value.description,
      form.value.date, form.value.time, form.value.numOfStudents,
      form.value.studentLevel, form.value.status, form.value.centreID)

  }

}
