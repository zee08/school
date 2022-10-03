import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { School } from 'src/app/model/school.model';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/service/request.service';
import { CurrentUserService } from 'src/app/service/currentUser.service';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/service/school.service';

@Component({
  selector: 'app-volunteer-school',
  templateUrl: 'volunteer-school.component.html',
  styleUrls: ['volunteer-school.component.css']
})
export class VolunteerSchoolComponent implements OnInit {

  resName="";
  schools:School[]=[];
  centresSub:School[] = [];
  private centreSub:Subscription | undefined;
  private sub: any;

  constructor(private router:Router, private route: ActivatedRoute,private requestService:RequestService,
    private currentUserService:CurrentUserService, public schoolService:SchoolService) { }

  ngOnInit(): void {
    this.schools = this.schoolService.getschools();
  //   this.sub = this.route.params.subscribe(params => {
  //     this.resName = params['resName'];
  //  });
  //   this.schoolService.getschools();
  //    this.centreSub = this.schoolService.getCentreUpdateListener()
  //    .subscribe((schools:School[]) => {
  //      this.schools=schools;
  //    });
  //   let centres = this.requestService.getSchoolsofRequestbyTutorial(this.resName);
  // }
  // ngOnDestroy(){
  //   this.centreSub?.unsubscribe();
  // }
}
}
