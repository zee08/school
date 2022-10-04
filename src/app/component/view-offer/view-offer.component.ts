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
import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {Sort, MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';


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

export class ViewOfferComponent implements AfterViewInit {
  //dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'date', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null;
}


export interface PeriodicElement {
  date: string;
  id: number;
  status: string;
  edit: string;
  offerdate: string,
  remarks: string,
  name: string,
  age: number,
  occupation: string,
}


const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    date: '4/10/2022',
    status: 'PENDING',
    edit: 'edit',
    offerdate: '6/10/2022',
    remarks:'HP laptp, 8 GB',
    name: 'James',
    age: 22,
    occupation: 'student',
  },
  {
    id: 2,
    date: '5/10/2022',
    edit: 'edit',
    status: 'PENDING',
    offerdate: '8/10/2022',
    remarks:'Math class, IGCSE level',
    name: 'Alina',
    age: 29,
    occupation: 'teacher',
  },
  {
    id: 3,
    date: '5/10/22',
    edit: 'edit',
    status: 'NEW',
    offerdate: '10/10/2022',
    remarks:'Mobile devices: android',
    name: 'Kim',
    age: 23,
    occupation: 'student',
  },
  {
    id: 4,
    date: '8/10/2022',
    edit: 'edit',
    status: 'COMPLETE',
    offerdate: '12/10/2022',
    remarks:'Netwroking Device',
    name: 'Maria',
    age: 32,
    occupation: 'Business',
  },
  {
    id: 5,
    date: '10/10/2022',
    edit: 'edit',
    status: 'CLOSED',
    offerdate: '6/10/2022',
    remarks:'DELL laptop',
    name: 'ALi',
    age: 22,
    occupation: 'student',
  },
  {
    id: 6,
    date: '1/11/2022',
    edit: 'edit',
    status: 'PENDING',
    offerdate: '10/10/2022',
    remarks:'Desktop monitors',
    name: 'Alina',
    age: 28,
    occupation: 'Accountant',
  },
  {
    id: 7,
    date: '20/22/2022',
    edit: 'edit',
    status: 'PENDING',
    offerdate: '30/10/2022',
    remarks:'Economics Alevel',
    name: 'Jennifer',
    age: 30,
    occupation: 'Teacher',
  },
  {
    id: 8,
    date: '1/10/2022',
    edit: 'edit',
    status: 'PENDING',
    offerdate: '6/10/2022',
    remarks:'HP laptp, 8 GB',
    name: 'andrew',
    age: 19,
    occupation: 'student',
  },
  {
    id: 9,
    date: '30/9/2022',
    edit: 'edit',
    status: 'PENDING',
    offerdate: '1/10/2022',
    remarks:'English Language',
    name: 'Maria',
    age: 30,
    occupation: 'Lecturer',
  },
  {
    id: 10,
    date: '11/10/2022',
    edit: 'edit',
    status: 'PENDING',
    offerdate: '12/10/2022',
    remarks:'HP laptp, 8 GB',
    name: 'James',
    age: 25,
    occupation: 'student',
  },
];
//   sortData(sort: Sort) {
//     const data = this.desserts.slice();
//     if (!sort.active || sort.direction === '') {
//       this.sortedData = data;
//       return;
//     }

//     this.sortedData = data.sort((a, b) => {
//       const isAsc = sort.direction === 'asc';
//       switch (sort.active) {
//         case 'id':
//           return compare(a.id, b.id, isAsc);
//         case 'status':
//           return compare(a.status, b.status, isAsc);
//         case 'date':
//           return compare(a.date, b.date, isAsc);
//         default:
//           return 0;
//       }
//     });
//   }



// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
