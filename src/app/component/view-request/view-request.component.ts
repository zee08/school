// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { School } from 'src/app/model/school.model';
// import { Subscription } from 'rxjs';
// import { ResourceService } from 'src/app/service/resource.service';
// import { CurrentUserService } from 'src/app/service/currentUser.service';
// import { Router } from '@angular/router';
// import { SchoolService } from 'src/app/service/school.service';
// import { Resource } from 'src/app/model/request.model';
// import { UserService } from 'src/app/service/user.service';
// import { User } from 'src/app/model/user.model';
// @Component({
//   selector: 'app-view-request',
//   templateUrl: 'view-request.component.html',
//   styleUrls: ['view-request.component.css']
// })

// export class ViewRequestComponent implements OnInit {
//   schools:School[] = [];
//   resources:Resource[]=[];
//   resId:string;
//   schoolsSub: School[]=[];
//   private schoolSub : Subscription;
//   private resourcesSub: Subscription | undefined;
//   private sub:any;
//   private user:User;


//   //private resourceSub: Subscription | undefined;

//   constructor(public resourceService: ResourceService, private router:Router,
//     private route:ActivatedRoute,private currentUser:CurrentUserService,
//     private schoolService:SchoolService, userService:UserService){}

//   ngOnInit(): void {
//     this.sub = this.route.params.subscribe(params =>{
//       this.resId = params['resID'];
//     });
//     this.schoolService.getschools();
//     this.schoolSub = this.schoolService.getSchoolUpdateListener()
//     .subscribe((schools: School[])=>{
//       this.schools = schools;
//     });
//     let schools = this.resourceService.getSchoolofResource(this.resId);


//     this.resourceService.getResources();
//   }
//   ngOnDestroy(){
//     this.schoolSub?.unsubscribe();
//   }
// // getTotalResources(resource:Resource){
// //   return this.resourceService.getAllTotalResources(resource);
// // }

// // getTotalAvailableResource(resource:Resource){
// //   return this.resourceService.getTotalNewResources(resource);
// // }
// }
//new


import { Component, OnInit, Inject } from "@angular/core";
import { Request } from "src/app/model/resource.model";
import { Resource } from "src/app/model/request.model";
import { ResourceService } from "src/app/service/resource.service";
import { ReqService } from "src/app/service/request.service";
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog, MatDialogRef, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NgForm, NgModel } from "@angular/forms";
import { CurrentUserService } from "src/app/service/currentUser.service";
import { OfferService } from "src/app/service/offer.service";
import { SchoolService } from "src/app/service/school.service";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Offer } from "src/app/model/offer.model";
import { School } from "src/app/model/school.model";
import { Dialog, DialogRef } from "@angular/cdk/dialog";
import { formatCurrency } from "@angular/common";
import { request } from "express";

@Component ({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls:['./view-request.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ViewRequestComponent implements OnInit{
request:Request;
offer:Offer;
  requests : Request[] =[];
  newRequests:Request[]=[];
  school:School[]=[];
  offers:Offer[]=[];

  private requestsSub: Subscription | undefined;
  private offerSub: Subscription|undefined;
  private schoolSub: Subscription|undefined;
  dataSource!: MatTableDataSource<Request>;
offerID:String='';
reqID:String="";
offerDate: Date;
schoolID:String="";
remarks: "";
  constructor(public dialog: MatDialog, public reqService:ReqService, public schoolService:SchoolService,
    public offerService:OfferService, public currentUserService:CurrentUserService, public route:ActivatedRoute){}


  displayedColumns: string[] = ['Description','School Name', 'City', 'Resource Type'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Request | null;

  ngOnInit(){
    this.reqService.getRequest();
    this.requestsSub = this.reqService.getRequestUpdateListener().subscribe((requests: Request[])=>{
      this.requests = requests;
      for(let i=0; i<this.requests.length; i++){
        if(this.requests[i].status==='New'){
          this.newRequests.push(this.requests[i]);
        };
      }
      this.dataSource = new MatTableDataSource(requests);

    });
    this.reqService.getschools();
    this.schoolSub = this.reqService.getSchoolUpdateListener().subscribe((school:School[])=>{
      this.school = school;
    })

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{

    });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // checkAppointed(reqID:String) {
  //   return !(!this.offerService.checkUserAppointed(reqID,this.currentUserService.getUser()));
  // }

openDialog(): void {

  const dialogRef=this.dialog.open(RequestDialogComponent, {

    width: '300px',
    data:{enterremarks: this.remarks}

    // enterAnimationDuration,
    // exitAnimationDuration,

  });
//   dialogRef.afterClosed().subscribe(result => {

//     let school = this.schoolService.getschoolByID(this.schoolID);
//     if (this.remarks!=undefined&&school!=undefined){

//       this.offerService.addOffer(

//         this.offerID, this.offerDate,
//         this.reqID, this.currentUserService.getUsername(),
//       this.remarks
//       );

//     }
//   });
// }
}}
// }
export interface DialogData{
  enterremarks: String;

}

@Component({
selector: 'request-dialog',
templateUrl: 'request-dialog.component.html',
})

export class RequestDialogComponent {
constructor(public dialogRef: MatDialogRef<RequestDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, public currentuser:CurrentUserService, public offerService:OfferService, public reqService:ReqService) {}

  onSavePost(form:NgForm){
    if(form.invalid){
      return;
    }
    form.value.username = this.currentuser.getUsername();
    form.value.request = this.reqService.getRequest();
    this.offerService.addOffer(form.value.offerID, form.value.request, form.value.offerDate,
      form.value.username, form.value.remarks)

  }

onNoClick(){
  this.dialogRef.close()
}
}

// private schoolSub: Subscription | undefined;
// private requestsSub: Subscription | undefined;

// school: School[]=[];
// requests : Request[] =[];
// newrequest:Request[]=[];
// dataSource!: MatTableDataSource<Request>;

// constructor(public dialog: MatDialog, public reqService:ReqService){}

// displayedColumns: string[] = ['Description','School Name', 'City'];
// columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
// expandedElement!: Request | null;

// ngOnInit(){
//   this.reqService.getRequest();

//   this.requestsSub = this.reqService.getRequestUpdateListener().subscribe((requests: Request[])=>{
//     this.requests = requests;
//     for(let i = 0; i < this.requests.length; i++){
//       if(this.requests[i].status=='New'){
//         this.newrequest.push(this.requests[i]);
//       };
//     };
//     this.dataSource = new MatTableDataSource(this.newrequest);
//   });
//   this.reqService.getschools();
//   this.schoolSub = this.reqService.getSchoolUpdateListener().subscribe((school: School[])=>{
//     this.school = school;
//   })
// }

// applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();
// }

// openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
//   this.dialog.open(RequestDialogComponent, {
//     width: '700px',
//     height: '300px',
//     enterAnimationDuration,
//     exitAnimationDuration,
//   });
// }

// }
// @Component({
// selector: 'request-dialog',
// templateUrl: 'request-dialog.component.html',
// })

// export class RequestDialogComponent {
// constructor(public dialogRef: MatDialogRef<RequestDialogComponent>) {}
// }
