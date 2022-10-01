import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { VaccineService } from 'src/app/service/vaccine.service';
import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Vaccination } from 'src/app/model/vaccination.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/model/batch.model';
@Component({
  selector: 'app-view-offer',
  templateUrl: 'view-offer.component.html',
  styleUrls:['view-offer.component.css']
})

export class ViewOfferComponent implements OnInit {
  vaccinations: Vaccination[]=[];
  tutorials:Tutorial[]=[];
  vacName:String="";
  constructor(private route: ActivatedRoute, public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public vaccineService:VaccineService,public userService:UserService,
    public dialog: MatDialog, private _snackBar: MatSnackBar, private router:Router) { }
  ngOnInit(): void {

  }

  onApprove(vacID:String){
    let vac = this.vaccinationService.getVaccinationbyID(vacID);
    // if (vac!=undefined){
    //   this.vaccinationService.approveVaccination(vac);
    //   this. openApprovedSnackBar();
    // };
    this.ngOnInit();
  }

  onComplete(vacID:String){
    let vac = this.vaccinationService.getVaccinationbyID(vacID);
    // if (vac!=undefined){
    //   this.vaccinationService.completeVaccination(vac);
    //   this.openCompleteSnackBar();
    // };
    this.ngOnInit();
  }

  onReject(vac: Vaccination){
    this.vaccinationService.declineVaccination(vac);
    this.ngOnInit();
  }

  getUser(userID:String){
    return this.userService.getUserByID(userID);
  }
  getBatch(batchID:String){
    return this.vaccineService.getBatchbyID(batchID);
  }
  countAvailable(batchID: String){

  }
  getBatchManufacturer(batchID: String){
    return this.vaccineService.getManufacturerbyBatchID(batchID);
  }
}

@Component({
  selector: 'admin-complete-snack-bar',
  templateUrl: 'admin-complete-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class AdminCompleteSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<AdminCompleteSnackBarComponent>){}
}

@Component({
  selector: 'admin-approved-snack-bar',
  templateUrl: 'admin-approved-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class AdminApprovedSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<AdminApprovedSnackBarComponent>){}
}
