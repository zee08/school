import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Vaccination } from 'src/app/model/vaccination.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/model/request.model';
import { Resource} from 'src/app/model/request.model';
import { RequestService } from 'src/app/service/request.service';
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


  constructor(private route: ActivatedRoute, public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public requestService:RequestService,public userService:UserService,
    public dialog: MatDialog, private _snackBar: MatSnackBar, private router:Router) { }


  ngOnInit(): void {

    this.resources = this.requestService.getResources();
    this.tutorials=this.requestService.getTutorials();
    //this.vaccines = this.vaccineService.getVaccines();
  }



}

@Component({
  selector: 'volunteer-complete-snack-bar',
  templateUrl: 'volunteer-complete-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class VolunteerCompleteSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<VolunteerCompleteSnackBarComponent>){}
}

@Component({
  selector: 'vol-approved-snack-bar',
  templateUrl: 'volunteer-approved-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class VolunteerApprovedSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<VolunteerApprovedSnackBarComponent>){}
}

import {Sort} from '@angular/material/sort';

export interface Dessert {
  id: number;

  status: string;
  date:string;
}

export class ViewOfferComponent  {
  desserts: Dessert[] = [
    {id: 0, status: 'Pending', date: '1/10/2022'},
    {id: 1, status: 'Pending', date: '4/10/2022'},
    {id: 3, status: 'NEW', date: '8/10/2022'},
    {id: 4, status: 'Pending',  date: '5/10/2022'},
    {id: 5, status: 'Pending', date: '9/10/2022'},
  ];

  sortedData: Dessert[];

  constructor() {
    this.sortedData = this.desserts.slice();
  }

  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


