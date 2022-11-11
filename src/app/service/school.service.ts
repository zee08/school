import { Injectable } from '@angular/core';
import { School } from '../model/school.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools: School[] = [
  ];
  private schoolsUpdated = new Subject<School[]>();


  constructor(private http: HttpClient) {}

  getschools(){
    //return this.schools;
    this.http.get<{message: String, schools: School[]}>('http://localhost:3000/api/schools')
    .subscribe((schoolData)=>{
      this.schools = schoolData.schools;
      this.schoolsUpdated.next([...this.schools]);
    })

  }

  addSchool(schoolID: String, schoolname: String, address: String,
    city:string) {
    const school: School = {
      schoolID: schoolID,
      schoolname: schoolname,
      address: address,
      city: city,

    }
    this.http.post<{message: string}>('http://localhost:3000/api/schools', school)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.schools.push(school);
      this.schoolsUpdated.next([...this.schools]);
    })

  }

  getschoolByID(schoolID: String){
    for (let i=0;i<this.schools.length;i++){

      if (this.schools[i].schoolID === schoolID)
        return this.schools[i]
    }
    return;
  }

  getSchoolIDbyName(schoolname:string,city:string){
    let found = this.schools.find(i=>i.schoolname === schoolname&&i.city===city);
    if (typeof(found) != "undefined")
      return found.schoolID;
    return;
  }

getSchoolUpdateListener(){
  return this.schoolsUpdated.asObservable();
}
}
