
import  { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { School } from 'src/app/model/school.model';
import { SchoolService } from 'src/app/service/school.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls:['login.component.css']
})

export class LoginComponent {
page: number;
users:User[]=[];
schools:School[]=[];
  ICoptionValue:any;
  inputEmail='';
  inputUser='';
  inputUserID='';
  inputFullName='';
  inputPhone=0;
  inputPassword='';
  inputStaffID='';
  inputSchoolID='';
  inputPosition='';
  inputOccupation='';
  inputDateofbirth='';
  placeholderName:string;
  durationInMiliSeconds = 3000;
  Auth='';school='';schoolID='';
  newSchoolSelect=new FormControl(false);
  constructor(public userService:UserService, private dialog:MatDialog, private _snackBar:MatSnackBar,
    public schoolService:SchoolService, public currentUserService:CurrentUserService

    ) {
this.page=0;
    }
    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

ngOnInit(): void {
this.users=this.userService.getUsers();
this.schools=this.schoolService.getschools();
}


  openSnackBar() {
    this._snackBar.openFromComponent(InvalidLoginSnackbarComponent, {
      duration: this.durationInMiliSeconds,
    });
  }

  //form controll
  verifyEmail(form: NgForm) {
     if (form.invalid){console.log("invalid email");return;}
   this.inputEmail = form.value.email;
    let found=this.userService.getUserByEmail(this.inputEmail)
    if (found!=undefined){
      this.placeholderName=found.username;
      this.page=6;
      return;
    }

  }

  verifyVolunteer(form: NgForm){
    if (form.invalid){console.log("invalid Volunteer");return;}
    this.inputUser=form.value.username;
    this.inputPassword=form.value.password;
    this.inputFullName=form.value.fullname;

    this.inputPhone=form.value.phone;

      this.page=0;

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
    this.schools = this.schoolService.getschools();
    this.page=3;

  }

  newSchool(form: NgForm){
    if (form.invalid){console.log("invalid school");return;}
    let id = Math.floor(Math.random()*999999).toString( );
    this.schoolService.addSchool(id, form.value.name,
    form.value.address,form.value.city)
    this.inputSchoolID=id;
    if(form.invalid){

      return;
    }
      this.dialog.open(RegSuccessDialog);
      this.page=4;
      form.resetForm();
  }

  login(form: NgForm){
    if (form.invalid){this.openSnackBar();console.log("invalid login detail");return;}
    this.currentUserService.login(this.inputEmail,form.value.password);
     this.currentUserService.getToken();
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
this.page=4;
return;
  }




   registerVolunteer(form: NgForm) {
    this.userService.addVolunteer(form.value.username, form.value.password, form.value.fullname, form.value.dateofbirth,
      form.value.occupation, form.value.position, form.value.schoolID, form.value.staffid, form.value.phone, form.value.userID,
      form.value.email)
    this.page=0;
    this.dialog.open(RegSuccessDialog);
  }

  regAdmin(form: NgForm){
    if (form.invalid){console.log("invalid admin");return;}
    this.inputUser=form.value.username;
    this.inputPassword=form.value.password;
    this.inputFullName=form.value.fullname;
    this.inputStaffID=form.value.staffID;
    this.inputPosition=form.value.position;
    this.inputEmail=form.value.email;
    this.inputStaffID=form.value.staffID;
    this.userService.addAdmin(Math.floor(Math.random()*999999).toString( )
    ,this.inputUser,this.inputEmail,this.inputPassword, this.inputFullName,
    this.inputSchoolID,this.inputStaffID, this.inputPosition, this.inputOccupation, this.schoolID)
    //this.page=0;
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
