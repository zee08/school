import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Tutorial } from 'src/app/model/request.model';
import { Resource } from 'src/app/model/request.model';

@Component({
  selector: 'app-volunteer-request',
  templateUrl: 'volunteer-request.component.html',
  styleUrls:['volunteer-request.component.css']
})

export class VolunteerRequestComponent implements OnInit {
  tutorials: Tutorial[]=[];
  resources: Resource[]=[];
  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.tutorials= this.requestService.getTutorials();
    this.resources= this.requestService.getResources();
  }

  ngOnDestroy(){

  }
}
