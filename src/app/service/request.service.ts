import { Injectable } from '@angular/core';
import { Resource, Tutorial } from '../model/resource.model';
import { Subject } from 'rxjs';
import { CentresService } from './centres.service';

import { School } from '../model/school.model';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';

export interface Vaccine{
  resourceName: String;

}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(public centreService: CentresService){}
  // private vaccines: Vaccine[] = [
  //   {resourceName: "Mobile Device"},
  //   {resourceName: "Personal Computer"},
  //   {resourceName: "Networking Equipment"},

  // ];
  private resources: Resource[] = [];
  private resourcesUpdated = new Subject<Resource[]>();
 private tutorials: Tutorial[] = [];





  addResource( description:String, quantity: number, resourceType: String
    ) {
      const resource: Resource= {
        //id: "",
        description:description,
        //resourceID: resourceID,
        //resourceNumber: resourceNumber,
        quantity: quantity,
        //centre: centreID,
        //vaccine: vaccine,
        resourceType:resourceType,

      }

      this.resources.push(resource);
  }

  getResources(){
    return this.resources;
  }
  addTutorial(description:String, date:Date, time:Time, numOfStudents:number, studentLevel:String, status:String){
    const tutorial: Tutorial={
      description:description,
      date:date,
      time:time,
      numOfStudents:numOfStudents,
      studentLevel:studentLevel,
      status: 'New',
    }
    this.tutorials.push(tutorial)
  }

  getTutorials(){
    return this.tutorials;
  }



  getVaccineUpdateListener()
  {
    return this.resourcesUpdated.asObservable();
  }

}
