import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { AdminRequestComponent } from './component/admin-request/admin-request.component';
import { RequestInfoComponent } from './component/request-info/request-info.component';
import { ViewOfferComponent } from './component/view-offer/view-offer.component';
import { VolunteerNavComponent } from './component/volunteer-nav/volunteer-nav.component';
import { VolunteerHomeComponent } from './component/volunteer-home/volunteer-home.component';
import { ViewRequestComponent } from './component/view-request/view-request.component';
import { VolunteerSchoolComponent } from './component/volunteer-school/volunteer-school.component';
import { SubmitRequestComponent } from './component/volunteer-submit-request/submit-request.component';
import { RequestDialogComponent } from './component/view-request/view-request.component';
// import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin',redirectTo: 'admin/home' },
  {path:'admin',component:AdminNavComponent,
    children:[
      {path:'home',component:AdminHomeComponent},
      {path:'request', component:AdminRequestComponent},
      {path:'request/:resname/resources', component:AdminRequestComponent},
      {path:'offer', component:ViewOfferComponent},
      {path:'offer/:resname/:resourceID', component:ViewOfferComponent},

    ]
  },
  {path:'volunteer', redirectTo:'volunteer/home', pathMatch:'full'},
  {path:'volunteer', component:VolunteerNavComponent,
    children:[
      {path:'home', component:VolunteerHomeComponent},
      //{path: 'request/schools/:resname/:schoolID', component:},
      {path:'request', component:ViewRequestComponent},
      {path:'request/schools/:resname', component: VolunteerSchoolComponent},
      {path: 'request/:reqId', component: ViewRequestComponent},
      {path:'submit', component:SubmitRequestComponent},
      {path:'request/schools/:tutorial', component:VolunteerSchoolComponent},

    ]},




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule { }
