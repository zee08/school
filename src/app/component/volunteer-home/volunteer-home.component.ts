import { Component, OnInit } from '@angular/core';
import { Resource, Tutorial } from 'src/app/model/request.model';
import { School } from 'src/app/model/school.model';
import { SchoolService } from 'src/app/service/school.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-volunteer-home',
  templateUrl: 'volunteer-home.component.html',
  styleUrls: ['volunteer-home.component.css']
})

export class VolunteerHomeComponent implements OnInit {

  requests: Request[]=[];
  schools: School[]=[];
  constructor(public requestsService: RequestService,
    public schoolService: SchoolService) { }

  ngOnInit():void {
    this.requestsService.getResources();
    this.requestsService.getTutorials();
    this.schoolService.getschools();
   }
}

