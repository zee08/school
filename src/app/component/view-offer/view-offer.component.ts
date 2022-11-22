// import { Component, OnInit } from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';
// import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
// import { RequestService } from 'src/app/service/request.service';
// import { VaccinationService } from 'src/app/service/vaccination.service';
// import { CurrentUserService } from 'src/app/service/currentUser.service';
// import { Vaccination } from 'src/app/model/vaccination.model';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { UserService } from 'src/app/service/user.service';
// import { Router } from '@angular/router';
// import { Tutorial } from 'src/app/model/resource.model';
import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {Sort, MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ReqService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/resource.model';
import {Subscription} from 'rxjs'
import { User } from 'src/app/model/user.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Offer } from 'src/app/model/offer.model';
import { OfferService } from 'src/app/service/offer.service';

@Component({
  selector: 'app-view-offer',
  templateUrl: 'view-offer.component.html',
  styleUrls:['view-offer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ViewOfferComponent implements OnInit {
  requests : Request[] =[];
  users : User[]=[];
  offers:Offer[]=[];
  private requestsSub: Subscription | undefined;
  private usersSub: Subscription | undefined;
  private offerSub: Subscription | undefined;

  dataSource!: MatTableDataSource<Request>;
  constructor(public dialog: MatDialog, public reqService:ReqService, public offerService:OfferService){
  }

  displayedColumns: string[] = ['Description','School Name', 'City'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Request | null;

  ngOnInit(){
    this.reqService.getUsers();
    this.usersSub = this.reqService.getUserUpdateListener().subscribe((users: User[])=>{
      this.users = users;
    })

    this.reqService.getRequest();
    this.requestsSub = this.reqService.getRequestUpdateListener().subscribe((requests: Request[])=>{
      this.requests = requests;

      this.dataSource = new MatTableDataSource(requests);

    });

    this.offerService.getOffers();
    this.offerSub = this.reqService.getOfferUpdateListener().subscribe((offers:Offer[])=>{
      this.offers = offers;

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAcceptOfferDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AcceptOfferDialogComponent, {
      width: '400px',

      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openCloseOfferDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CloseOfferDialogComponent, {
      width: '400px',

      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
@Component({
  selector: 'accept-offer-dialog',
  templateUrl: 'accept-offer-dialog.component.html',
})

export class AcceptOfferDialogComponent {
  constructor(public dialogRef: MatDialogRef<AcceptOfferDialogComponent>) {}
}

@Component({
  selector: 'close-offer-dialog',
  templateUrl: 'admin-approved.component.html',
})

export class CloseOfferDialogComponent {
  constructor(public dialogRef: MatDialogRef<CloseOfferDialogComponent>) {}
}

