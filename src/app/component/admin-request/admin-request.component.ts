// import { Component, OnInit } from '@angular/core';
// import { Resource } from 'src/app/model/request.model';
// import { AccService } from 'src/app/service/account.service';
// import { CurrentUserService } from 'src/app/service/currentUser.service';
// import { NgForm, FormControl, FormBuilder } from "@angular/forms";
// import { Subscription } from 'rxjs';
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Tutorial } from 'src/app/model/tutorial.model';
// import { TutorialService } from 'src/app/service/tutorial.service';
// @Component({
//   selector: 'app-admin-request',
//   templateUrl: 'admin-request.component.html',
//   styleUrls: ['admin-request.component.css']
// })

// export class AdminRequestComponent implements OnInit {
//   resources:Resource[] = [];
//   resource:Resource;
//   tutorials: Tutorial[]=[];
//   inputDescription: '';
//   inputResType: '';
//   inputQuantity: 0;
//   inputStatus: '';
//   inputResID: '';
//   inputTutID:'';
//   inputDate:Date;
//   inputTime:'';
//   inputStudentLevel:'';
//   inputNumOfStudents:0;
//   inputSchool:any;
//   inputSchoolname:any;
//   school:'';
//   schoolname:'';
// private resourceSub: Subscription | undefined;
// private tutorialSub: Subscription | undefined;
// private resourceId: string;
// resourceType: String='';
// private sub: any;
// currentUser: any;
//   constructor(public accService:AccService,
//     public currentUserService:CurrentUserService, private route: ActivatedRoute, public tutorialsService:TutorialService) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((paramMap: ParamMap)=> {
//       if(paramMap.has('reqId')){

//         this.resourceId = paramMap.get('resourceId');
//        this.resource = this.accService.getRequest();
//       } else {

//         this.resourceId = null;
//       }
//     });
//     this.currentUser = this.currentUserService.getUser();

//   this.resourceService.getResources();
//   this.tutorialsService.getTutorials();

//     //this.resourceService.getAllResources();
//     this.resourceSub = this.resourceService.getresourcesUpdateListener()
//     .subscribe((resources: Resource[])=>{
//       this.resources = resources;
// this.inputSchoolname = this.currentUserService.getSchoolname();


//     });




//   }

//   ngOnDestroy(){
//     this.resourceSub.unsubscribe();
//     this.tutorialSub.unsubscribe();

//   }
//   getTotalResources(resource: Resource){
//     //return this.resourceService.getTotalResource(resource,this.currentUserService.getSchoolID())
//   }

//   onAddTutorial(form: NgForm){

//    if(form.invalid){
//     return;
//    }
//    this.inputTutID = form.value.tutID;
//     this.inputDescription = form.value.description;
//     this.inputDate = form.value.date;
//     this.inputTime = form.value.time;
//     this.inputStudentLevel = form.value.studentLevel;
//     this.inputNumOfStudents = form.value.numOfStudents;
//     this.tutorialsService.addTutorial(Math.floor(Math.random()*999999).toString( ),this.inputDescription,
//     this.inputDate, this.inputTime,this.inputStudentLevel, this.inputNumOfStudents, this.inputSchool, this.inputStatus)

//   }

//   onAddResource(form: NgForm){

//     if(form.invalid){
//       return;
//     }
//     this.inputResID = form.value.resID;
//     this.inputDescription = form.value.description;
//     this.inputQuantity = form.value.quantity;
//     this.inputResType = form.value.resourceType;
//     this.inputStatus = form.value.status;
//     this.inputSchoolname=form.value.schoolname,
//     this.resourceService.addResource(Math.floor(Math.random()*999999).toString( ),this.inputDescription, this.inputQuantity, this.inputResType,
//     this.inputSchool, this.inputStatus, this.inputSchoolname);
//     form.resetForm()
//   }
//   onDelete(resourceId: string){
//     this.resourceService.deleteResource(resourceId);
//   }



// }
import { Component, OnInit } from '@angular/core';
import { User } from "src/app/model/user.model";
import { UserService } from "src/app/service/user.service";
import { CurrentUserService } from "src/app/service/currentUser.service";
import { NgForm } from "@angular/forms";
import { AccService } from "src/app/service/account.service";
import { Request } from 'src/app/model/resource.model';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-admin-request',
    templateUrl: 'admin-request.component.html',
    styleUrls: ['admin-request.component.css']
  })

  export class AdminRequestComponent implements OnInit{
requests:Request[]=[];
    resourceType:any;
    user:User;
    currentUser:any;

    private requestSub:Subscription | undefined;

    constructor(private accService:AccService, public userService:UserService,
      public currentService:CurrentUserService){}
ngOnInit(): void {
  this.accService.getRequest();
  this.requestSub = this.accService.getRequestUpdateListener()
  .subscribe((requests: Request[])=>{
    this.requests = requests;


  });

}

onAddResource(form:NgForm){
  if (form.invalid){
    return;
  }
  this.user = this.currentService.getUser();
  var today = new Date();
  form.value.schoolname = this.currentService.getSchoolname();
  form.value.city = this.currentService.getCity();
  this.accService.AddRequest(form.value.description, form.value.quantity, form.value.resourceType, form.value.tutDescription, form.value.tutdate, form.value.time, form.value.studentLevel, form.value.numOfStudents, form.value.reqDate, form.value.schoolname, form.value.schoolID, form.value.city, form.value.status='New', form.value.remarks, form.value.reqType='Resource')

}

onAddTutorial(form:NgForm){
  if (form.invalid){
    return;
  }

  form.value.schoolname = this.currentService.getSchoolname();
  form.value.city = this.currentService.getCity();
  this.accService.AddRequest(form.value.description, form.value.quantity, form.value.resourceType, form.value.tutDescription, form.value.tutdate, form.value.time, form.value.studentLevel, form.value.numOfStudents, form.value.reqDate, form.value.schoolname, form.value.schoolID,form.value.city, form.value.status='New', form.value.remarks, form.value.reqType='Tutorial')

}
  }
