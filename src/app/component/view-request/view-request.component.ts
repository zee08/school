import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD


import { RequestService } from 'src/app/service/request.service';
=======
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

>>>>>>> 0ffea67e294f091968a290bba90faf624ee47bff
import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Vaccination } from 'src/app/model/vaccination.model';

import { UserService } from 'src/app/service/user.service';
<<<<<<< HEAD

=======
import { Router } from '@angular/router';
>>>>>>> 0ffea67e294f091968a290bba90faf624ee47bff
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
<<<<<<< HEAD


  constructor( public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public requestService:RequestService,public userService:UserService,
     ) { }
=======


  constructor(private route: ActivatedRoute, public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public requestService:RequestService,public userService:UserService,
    public dialog: MatDialog, private _snackBar: MatSnackBar, private router:Router) { }
>>>>>>> 0ffea67e294f091968a290bba90faf624ee47bff


  ngOnInit(): void {

    this.resources = this.requestService.getResources();
    this.tutorials=this.requestService.getTutorials();
    //this.vaccines = this.vaccineService.getVaccines();
  }


<<<<<<< HEAD



  onAddResource(form: NgForm){

    if(form.invalid){
      return;
    }
    this.requestService.addTutorial(form.value.description,
      form.value.date, form.value.time, form.value.numOfStudents,
      form.value.studentLevel, form.value.status, form.value.centreID)

  }
=======
>>>>>>> 0ffea67e294f091968a290bba90faf624ee47bff

}
