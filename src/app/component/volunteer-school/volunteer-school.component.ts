import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { School } from 'src/app/model/school.model';
import { Subscription } from 'rxjs';
//import { RequestService } from 'src/app/service/request.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/service/school.service';
import { ResourceService } from 'src/app/service/resource.service';
@Component({
  selector: 'app-volunteer-school',
  templateUrl: 'volunteer-school.component.html',
  styleUrls: ['volunteer-school.component.css']
})
export class VolunteerSchoolComponent implements OnInit {

  resName="";
  schools:School[]=[];
  schoolsSub:School[] = [];
  private schoolSub:Subscription | undefined;
  private sub: any;

  constructor(private router:Router, private route: ActivatedRoute,
    private currentUserService:CurrentUserService, public schoolService:SchoolService,
    private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.schoolService.getschools();
    this.sub = this.route.params.subscribe(params => {
      this.resName = params['resname'];
   });
    this.schoolService.getschools();
     this.schoolSub = this.schoolService.getSchoolUpdateListener()
     .subscribe((schools:School[]) => {
       this.schools=schools;
     });
    let schools = this.resourceService.getSchoolofResource(this.resName);
  }
  ngOnDestroy(){
    this.schoolSub?.unsubscribe();
  }
}

