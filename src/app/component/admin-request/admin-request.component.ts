import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/model/request.model';
import { ResourceService } from 'src/app/service/resource.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { NgForm, FormControl, FormBuilder } from "@angular/forms";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Tutorial } from 'src/app/model/tutorial.model';
import { TutorialService } from 'src/app/service/tutorial.service';
@Component({
  selector: 'app-admin-request',
  templateUrl: 'admin-request.component.html',
  styleUrls: ['admin-request.component.css']
})

export class AdminRequestComponent implements OnInit {
  resources:Resource[] = [];
  tutorials: Tutorial[]=[];
  inputDescription: '';
  inputResType: '';
  inputQuantity: 0;
  inputStatus: '';
  inputResID: '';
  inputTutID:'';
  inputDate:Date;
  inputTime:'';
  inputStudentLevel:'';
  inputNumOfStudents:0;
  inputSchool:any;
  school:'';
  schoolID:'';
private resourceSub: Subscription | undefined;
private tutorialSub: Subscription | undefined;

resourceType: String='';
private sub: any;
  constructor(public resourceService:ResourceService,
    public currentUserService:CurrentUserService, private route: ActivatedRoute, public tutorialsService:TutorialService) { }

  ngOnInit(): void {

  this.resourceService.getResources();
  this.tutorialsService.getTutorials();

    //this.resourceService.getAllResources();
    this.resourceSub = this.resourceService.getresourcesUpdateListener()
    .subscribe((resources: Resource[])=>{
      this.resources = resources;
this.inputSchool = this.currentUserService.getSchoolID();


    });




  }

  ngOnDestroy(){
    this.resourceSub.unsubscribe();
    this.tutorialSub.unsubscribe();

  }
  getTotalResources(resource: Resource){
    return this.resourceService.getTotalResource(resource,this.currentUserService.getSchoolID())
  }

  onAddTutorial(form: NgForm){

   if(form.invalid){
    return;
   }
   this.inputTutID = form.value.tutID;
    this.inputDescription = form.value.description;
    this.inputDate = form.value.date;
    this.inputTime = form.value.time;
    this.inputStudentLevel = form.value.studentLevel;
    this.inputNumOfStudents = form.value.numOfStudents;
    this.tutorialsService.addTutorial(Math.floor(Math.random()*999999).toString( ),this.inputDescription,
    this.inputDate, this.inputTime,this.inputStudentLevel, this.inputNumOfStudents, this.inputSchool, this.inputStatus)

  }

  onAddResource(form: NgForm){

    if(form.invalid){
      return;
    }
    this.inputResID = form.value.resID;
    this.inputDescription = form.value.description;
    this.inputQuantity = form.value.quantity;
    this.inputResType = form.value.resourceType;
    this.inputStatus = form.value.status;
    this.resourceService.addResource(Math.floor(Math.random()*999999).toString( ),this.inputDescription, this.inputQuantity, this.inputResType,
    this.inputSchool, this.inputStatus);
  }

  on


}
