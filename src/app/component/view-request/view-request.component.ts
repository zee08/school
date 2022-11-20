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


import { Component, OnInit } from "@angular/core";
import { Request } from "src/app/model/resource.model";
import { Resource } from "src/app/model/request.model";
import { ResourceService } from "src/app/service/resource.service";
import { AccService } from "src/app/service/account.service";
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

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

  requests : Request[] =[];
  private requestsSub: Subscription | undefined;
  dataSource!: MatTableDataSource<Request>;

  constructor(public dialog: MatDialog, public accService:AccService){}

  displayedColumns: string[] = ['Description','School Name', 'City', 'Resource Type'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Request | null;

  ngOnInit(){
    this.accService.getRequest();
    this.requestsSub = this.accService.getRequestUpdateListener().subscribe((requests: Request[])=>{
      this.requests = requests;
      this.dataSource = new MatTableDataSource(requests);

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RequestDialogComponent, {
      width: '700px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
@Component({
  selector: 'request-dialog',
  templateUrl: 'request-dialog.component.html',
})

export class RequestDialogComponent {
  constructor(public dialogRef: MatDialogRef<RequestDialogComponent>) {}


}
