import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/resource.model';
import {  ReqService } from 'src/app/service/request.service';
import { OfferService } from 'src/app/service/offer.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { School } from 'src/app/model/school.model';
import { SchoolService } from 'src/app/service/school.service';


import { NgForm, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-volunteer-request',
  templateUrl: 'submit-request.component.html',
  styleUrls: ['submit-request.component.css']
})

export class SubmitRequestComponent implements OnInit {
  reqID:String="";
  schoolID:String="";
  reqType:String="";
  requests:Request[]=[];
  requests_:Request[] = [];
  private reqSub:Subscription|undefined;
  schools:School[]=[];
  private schoolSub:Subscription|undefined;
  private sub:any;





  constructor(private router:Router,private route: ActivatedRoute,public reqService:ReqService,
    public currentUserService:CurrentUserService, public offerService:OfferService,
    public schoolService:SchoolService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }


    ngOnInit(): void {

    }

    onSavePost(form:NgForm){
      // if(form.invalid){
      //   return;
      // }
      // form.value.user = this.currentUserService.getUsername();
      // this.offerService.addOffer(form.value.offerID, form.value.offerDate,
      //   form.value.user, form.value.remarks)

    }
}
