import { Injectable } from '@angular/core';
import { Resource, Tutorial } from '../model/request.model';
import { Subject } from 'rxjs';
import { SchoolService } from './school.service';

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
  constructor(public schoolService: SchoolService){}
  // private vaccines: Vaccine[] = [
  //   {resourceName: "Mobile Device"},
  //   {resourceName: "Personal Computer"},
  //   {resourceName: "Networking Equipment"},

  // ];
  private resources: Resource[] = [];
  private requests: Request[]=[];
  private resourcesUpdated = new Subject<Resource[]>();
 private tutorials: Tutorial[] = [];





  addResource( description:String, quantity: number, resourceType: String, centreID:String,
    status:String
    ) {
      const resource: Resource= {
        //id: "",
        description:description,
        //resourceID: resourceID,
        //resourceNumber: resourceNumber,
        quantity: quantity,
        school: centreID,
        //vaccine: vaccine,
        resourceType:resourceType,
        status:status

      }

      this.resources.push(resource);
  }

  getResources(){
    return this.resources;
  }
  addTutorial(description:String, date:Date, time:Time, numOfStudents:number, studentLevel:String, status:String,
    centreID: String){
    const tutorial: Tutorial={
      description:description,
      date:date,
      time:time,
      numOfStudents:numOfStudents,
      studentLevel:studentLevel,
      status: 'New',
      school: centreID,
    }
    this.tutorials.push(tutorial)
  }

  getTutorials(){
    return this.tutorials;
  }

  getSchoolsofRequestbyTutorial(status: String){
    let schools: School[]=[];
    for(let i=0; i<this.requests.length; i++){
      if(this.tutorials[i].status === status){
        let school = this.schoolService.getschoolByID(this.tutorials[i].school);
        if(school!= null)
        schools.push(school);
      }
    }
    return schools;
  }

  getSchoolsofRequestbyResources(resourceType: String){
    let schools: School[]=[];
    for(let i=0; i<this.requests.length; i++){
      if(this.resources[i].resourceType === resourceType){
        let school = this.schoolService.getschoolByID(this.resources[i].school);
        if(school!= null)
        schools.push(school);
      }
    }
    return schools;
  }



  getVaccineUpdateListener()
  {
    return this.resourcesUpdated.asObservable();
  }

}
