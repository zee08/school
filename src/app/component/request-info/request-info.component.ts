import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Batch } from 'src/app/model/batch.model';
import { VaccineService } from 'src/app/service/vaccine.service';
import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vaccine } from 'src/app/service/vaccine.service';
import { Time } from '@angular/common';
import { Tutorial } from 'src/app/model/batch.model';

export interface DialogData {
  enteredNumber: String;
  selecteddate: Date;
  enteredQuantity: number;
}

@Component({
  selector: 'app-request-info',
  templateUrl: 'request-info.component.html',
  styleUrls: ['request-info.component.css']
})

export class RequestInfoComponent implements OnInit {
  constructor(private router:Router,private route: ActivatedRoute, public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public vaccineService:VaccineService,
    public dialog: MatDialog) {}

    selecteddate: "" | undefined;
  enteredQuantity=0;
  enteredNumber="";
  batchID:String="";
  vacName:String="";
  batches_:Batch[] = [];
  batches:Batch[] = [];
  tutorials: Tutorial[]=[];
  vaccines:Vaccine[] = [];
  private batchSub:Subscription | undefined;
  private sub: any;

  ngOnInit() {
    this.batches = this.vaccineService.getBatches();
    this.tutorials = this.vaccineService.getTutorials();

  }

  displayDate(date:Date){
    return date;
  }

  openAddBatchDialog(): void {
    const dialogRef = this.dialog.open(AddBatchDialogueComponent, {
      width: '250px',
      data: {
        selecteddate: this.selecteddate,
        enteredNumber: this.enteredNumber,
        enteredQuantity: this.enteredQuantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined){
        this.enteredNumber = result.enteredNumber;
        this.enteredQuantity = result.enteredQuantity;
        this.selecteddate = result.selecteddate;
        if (this.selecteddate!=undefined){
          let date = new Date(this.selecteddate);
          this.vaccineService.addBatches(this.vacName, Math.floor(Math.random()*999999).toString( ),
          this.enteredNumber,date,this.enteredQuantity,
          this.currentUserService.getCentreID(), this.vacName);

          return;
        }
      }
    });
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
