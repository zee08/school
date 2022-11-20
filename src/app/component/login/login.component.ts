
import  { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { School } from 'src/app/model/school.model';
import { SchoolService } from 'src/app/service/school.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user.model';
import { Admin } from 'src/app/model/admin.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls:['login.component.css']
})

export class LoginComponent {
page: number;
users:User[]=[];
///admins:Admin[]=[];
private usersSub: Subscription | undefined;
private adminsSub: Subscription | undefined;
private schoolSub:Subscription | undefined;
private sub: any;
schools:School[]=[];
cities:School[]=[];
  ICoptionValue:any;
  inputEmail='';
  inputUser='';
  inputUserID='';
  inputFullname='';
  inputPhone=0;
  inputPassword='';
  inputStaffID='';
  inputSchoolID='';
  inputPosition='';
  inputOccupation='';
  inputDateofbirth='';
  inputSchoolname="";
  inputCity="";
  placeholderName:String;
  durationInMiliSeconds = 3000;
  Auth='';school='';schoolID='';city='';
  newSchoolSelect=new FormControl(false);
  constructor(public userService:UserService, private dialog:MatDialog, private _snackBar:MatSnackBar,
    public schoolService:SchoolService, public currentUserService:CurrentUserService, private router: Router,
    private route:ActivatedRoute,

    ) {
this.page=0;
    }
    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

ngOnInit(): void {
this.userService.getUsers();
this.usersSub = this.userService.getUserUpdateListener()
.subscribe((users: User[])=>{
  this.users = users;
});

this.schoolService.getschools();
this.schoolSub = this.schoolService.getSchoolUpdateListener().
subscribe((schools:School[])=>{
  this.schools = schools;


});


}
ngOnDestroy(){
  this.usersSub.unsubscribe();
  this.schoolSub.unsubscribe();
  //this.adminsSub.unsubscribe();
}


  openSnackBar() {
    this._snackBar.openFromComponent(InvalidLoginSnackbarComponent, {
      duration: this.durationInMiliSeconds,
    });
  }

  //form controll
  verifyUser(form: NgForm) {
     if (form.invalid){console.log("invalid email");return;}
   this.inputUser = form.value.username;
    let found=this.userService.getUserByUsername(this.inputUser)
    if (found!=undefined){
      this.placeholderName=found.username;
      this.page=5;
      return;
    }
this.page=0;
  }



  verifyVolunteer(form: NgForm){
    if (form.invalid){console.log("invalid Volunteer");return;}
    this.inputUser=form.value.username;
    this.inputPassword=form.value.password;
    this.inputFullname=form.value.fullname;
    this.inputEmail = form.value.email;
    this.inputOccupation = form.value.occupation;
    this.inputDateofbirth = form.value.dateofbirth;
    this.inputPhone=form.value.phone;

      this.page=2;

    this.dialog.open(RegSuccessDialog);


  }


  verifyAdmin(form:NgForm) {
    if (this.newSchoolSelect.value){
      //new centre
      return;
    }
    this.inputSchoolID=form.value.school;
  }

  existingSchool(form: NgForm){
    if (form.invalid){console.log("invalid school");return;}
    this.inputSchoolID=form.value.school;
    this.page=4;

  }

  newSchool(form: NgForm){
    if (form.invalid){console.log("invalid school");return;}
    let id = Math.floor(Math.random()*999999).toString( );
    this.schoolService.addSchool(id, form.value.schoolname,
    form.value.address,form.value.city)
    this.inputSchoolID=id;
    this.page=4;

  }

  login(form: NgForm){
    if (form.invalid){this.openSnackBar();
      console.log("invalid login detail");
      return;
    }
    this.currentUserService.login(form.value.username,form.value.password);
    let hasToken = this.currentUserService.getToken();
    this.openSnackBar();
    form.reset();
    return;
   }



  public returnToFirst(){
    this.page=0;
    return;
  }

  public gotoVolunteerReg():any {
    this.page=2;
    return;

  }

  public gotoAdminReg() {
this.page=3;
return;
  }
  public gotoLogin():any {
    this.page=5;
    return;

  }

  public gotoAdminLog() {
this.page=6;
return;
  }
   registerVolunteer(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.inputUser=form.value.username;
    this.inputEmail = form.value.email;
    this.inputPassword=form.value.password;
    this.inputFullname=form.value.fullname;
    this.inputPhone = form.value.phone;
    this.inputOccupation = form.value.occupation;
    this.inputDateofbirth=form.value.dateofbirth;
    this.userService.addVolunteer(Math.floor(Math.random()*999999).toString( ),this.inputUser, this.inputEmail,
    this.inputPassword, this.inputFullname, this.inputPhone, this.inputOccupation, this.inputDateofbirth,
       )
    this.page=5;
    this.dialog.open(RegSuccessDialog);
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }

    this.inputUser=form.value.username;
    this.inputPassword=form.value.password;
    this.inputFullname=form.value.fullname;
    this.inputEmail = form.value.email;
    this.inputPhone = form.value.phone;
    this.inputStaffID=form.value.staffid;
    this.inputPosition = form.value.position;
    this.inputSchoolname = form.value.schoolname,
    this.inputCity = form.value.city;
    this.userService.addAdmin(Math.floor(Math.random()*999999).toString( ),
    this.inputUser, this.inputPassword, this.inputFullname, this.inputEmail, this.inputPhone, this.inputStaffID,
    this.inputPosition, this.inputSchoolname, this.inputSchoolID, this.inputCity);
    // this.userService.addAdmin(form.value.username, form.value.password, form.value.fullname,
    //    form.value.position, form.value.schoolID, form.value.staffid, form.value.phone, form.value.userID,
    //   form.value.email);

    this.page=5;
    this.dialog.open(RegSuccessDialog);
  }
}



@Component({
  selector: 'reg-success-dialog',
  templateUrl: './RegSuccessDialog.html',
})
export class RegSuccessDialog {
  constructor(
    public dialogRef: MatDialogRef<RegSuccessDialog>) {}
  onClick(){
    this.dialogRef.close();
  }
}


@Component({
  selector: './invalid-login-snack-bar',
  templateUrl: './invalid-login-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class InvalidLoginSnackbarComponent {}
