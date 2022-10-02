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
import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';

export interface Dessert {
  id: number;

  status: string;
  date:string;
}


@Component({
  selector: 'app-view-offer',
  templateUrl: 'view-offer.component.html',
  styleUrls:['view-offer.component.css']
})

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
