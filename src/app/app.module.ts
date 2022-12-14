
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';



import { MatDialogModule} from  '@angular/material/dialog';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'

import { CommonModule } from '@angular/common';
import { MatRippleModule} from '@angular/material/core';


import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';



//import { RegSuccessDialog } from './component/login/login.component';


//import { InvalidLoginSnackbarComponent } from './component/login/login.component';
import { ErrorComponent } from './component/error/error.component';


//old
import { NgModule } from '@angular/core';
import { NgControlStatus } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SignupComponent } from './component/signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import {MatAccordion} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './component/login/login.component';
import { Routes, RouterModule} from '@angular/router';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginVolComponent } from './component/signup/signup.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminRequestComponent } from './component/admin-request/admin-request.component';
import { RequestInfoComponent } from './component/request-info/request-info.component';
import { AddBatchDialogueComponent } from './component/request-info/request-info.component';
import { ViewOfferComponent } from './component/view-offer/view-offer.component';
import { VolunteerHomeComponent } from './component/volunteer-home/volunteer-home.component';
import { VolunteerNavComponent } from './component/volunteer-nav/volunteer-nav.component';
import { VolunteerSchoolComponent } from './component/volunteer-school/volunteer-school.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewRequestComponent } from './component/view-request/view-request.component';
import { SubmitRequestComponent } from './component/volunteer-submit-request/submit-request.component';
import { AuthInterceptor } from 'src/app/auth/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { RequestDialogComponent } from './component/view-request/view-request.component';
import { AcceptOfferDialogComponent } from './component/view-offer/view-offer.component';
@NgModule({
  declarations: [

    AdminHomeComponent,
    AdminNavComponent,
    LoginVolComponent,
    AdminRequestComponent,
    ErrorComponent,
    RequestInfoComponent,
    AppComponent,
    HeaderComponent,
LoginComponent,
    SignupComponent,
    AddBatchDialogueComponent,
    VolunteerHomeComponent,
    ViewOfferComponent,
    VolunteerNavComponent,
    VolunteerSchoolComponent,
    RequestDialogComponent,
    ViewRequestComponent,
    SubmitRequestComponent,
    AcceptOfferDialogComponent,


  ],

  imports: [


    //old
    BrowserModule,
    MatExpansionModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    CommonModule,
    MatRippleModule,
HttpClientModule,
AppRoutingModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})


export class AppModule { }
