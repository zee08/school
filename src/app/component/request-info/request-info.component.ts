import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Resource, Tutorial } from 'src/app/model/request.model';
import { RequestService } from 'src/app/service/request.service';

import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Time } from '@angular/common';

export interface DialogData {
  enteredNumber: String;
  //selecteddate: Date;
  enteredQuantity: number;
  enteredDescription: String;
}

@Component({
  selector: 'app-request-info',
  templateUrl: 'request-info.component.html',
  styleUrls: ['request-info.component.css']
})

export class RequestInfoComponent implements OnInit {
  constructor(private router:Router,private route: ActivatedRoute,
    public currentUserService:CurrentUserService, public requestService:RequestService,
    public dialog: MatDialog) {}

    selecteddate: "" | undefined;
  enteredQuantity=0;
  enteredNumber="";
  enteredDescription="";
  resourceID:String="";
  resName:String="";
  resources_:Resource[] = [];
  resources:Resource[] = [];
  tutorials: Tutorial[]=[];



  ngOnInit() {
    this.resources = this.requestService.getResources();

  }

  displayDate(date:Date){
    return date;
  }

  openAddBatchDialog(): void {
    const dialogRef = this.dialog.open(AddBatchDialogueComponent, {
      width: '250px',
      data: {

        enteredNumber: this.enteredNumber,
        enteredQuantity: this.enteredQuantity,
        enteredDescription: this.enteredDescription,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined){
      }
        return;

        })
      }
      }




@Component({
  selector: './add-batch-dialogue',
  templateUrl: './add-batch-dialogue.html',
  providers: [
    { provide: MatDialog, useClass: AddBatchDialogueComponent },
  ],

})
export class AddBatchDialogueComponent implements OnInit{

  verify=true;

  constructor(
    public dialogRef: MatDialogRef<AddBatchDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let date: Date = new Date()
    if(event.value!=undefined){
      if (date>event.value){
        this.verify = true;
        return;
      }
      this.verify = false;
      return}
    this.verify = true;
  }
  ngOnInit() {
  }


}
