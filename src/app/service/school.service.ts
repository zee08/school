import { Injectable } from '@angular/core';
import { School } from '../model/school.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools: School[] = [
  ];
   //set type to post array(model) and assign to empty array
  // private centresUpdated = new Subject<Centre[]>();

  constructor() {}

  getschools(){
    return this.schools;
    // this.http.get<{message: string, centres: Centre[]}>('http://localhost:3000/api/centres')
    // .subscribe((centreData)=>{
    //   this.centres = centreData.centres;
    //   this.centresUpdated.next([...this.centres]);
    // })
  }

  addSchool(centreID: String, centreName: String, centreAddress: String,
    centrePos:number, centreState:String) {
    const school: School = {
      centreID: centreID,
      centreName: centreName,
      centreAddress: centreAddress,
      centrePos: centrePos,
      centreState: centreState,
    }//var storing values

    this.schools.push(school);
    // this.http.post<{message: string}>('http://localhost:3000/api/centres', centre)
    // .subscribe((responseData)=>{
    //   console.log(responseData.message);
    //   this.centres.push(centre);
    //   this.centresUpdated.next([...this.centres]);
    // })
  }

  getschoolByID(schoolID: String){
    for (let i=0;i<this.schools.length;i++){

      if (this.schools[i].centreID === schoolID)
        return this.schools[i]
    }
    return;
  }

  getSchoolIDbyName(name:string,address:string){
    let found = this.schools.find(i=>i.centreName === name&&i.centreAddress===address);
    if (typeof(found) != "undefined")
      return found.centreID;
    return;
  }

//   getCentreUpdateListener()
//   {
//     return this.centresUpdated.asObservable();
//   }
// }
}
