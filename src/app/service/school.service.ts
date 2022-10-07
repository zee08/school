import { Injectable } from '@angular/core';
import { School } from '../model/school.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools: School[] = [
  ];


  constructor() {}

  getschools(){
    return this.schools;

  }

  addSchool(schoolID: String, name: String, address: String,
    city:string) {
    const school: School = {
      schoolID: schoolID,
      name: name,
      address: address,
      city: city,

    }//var storing values

    this.schools.push(school);

  }

  getschoolByID(schoolID: String){
    for (let i=0;i<this.schools.length;i++){

      if (this.schools[i].schoolID === schoolID)
        return this.schools[i]
    }
    return;
  }

  getSchoolIDbyName(name:string,address:string){
    let found = this.schools.find(i=>i.name === name&&i.address===address);
    if (typeof(found) != "undefined")
      return found.schoolID;
    return;
  }


}
