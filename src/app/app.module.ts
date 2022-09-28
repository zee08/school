
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
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SignupComponent } from './component/signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './component/login/login.component';
import { Routes, RouterModule} from '@angular/router';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserService } from './service/user.service';
import { LoginVolComponent } from './component/signup/signup.component';
import {MatSidenavModule} from '@angular/material/sidenav';
const appRoutes: Routes = [
  {path:'login',component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path:'loginVol', component:LoginVolComponent},
  {path: 'admin',redirectTo: 'admin/home', pathMatch: 'full' },
  {path:'admin',component:AdminNavComponent,
    children:[
      {path:'home',component:AdminHomeComponent},

    ]
  },


]
@NgModule({
  declarations: [

    AdminHomeComponent,
    AdminNavComponent,
    LoginVolComponent,



    //InvalidLoginSnackbarComponent,
    ErrorComponent,
    //old
    AppComponent,
    HeaderComponent,
LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminPageComponent,





  ],

  imports: [


    //old
    BrowserModule,

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


    MatButtonToggleModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    CommonModule,
    MatRippleModule,

    RouterModule.forRoot(appRoutes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
