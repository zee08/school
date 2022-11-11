import { Injectable } from '@angular/core';
import { Tutorial } from '../model/tutorial.model';
import { Subject } from 'rxjs';
import { SchoolService } from './school.service';
import { HttpClient } from '@angular/common/http';
import { School } from '../model/school.model';
import { map  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  constructor(public schoolService: SchoolService, private http: HttpClient,){}

  private tutorials: Tutorial[] = [];

  private tutorialUpdated = new Subject<Tutorial[]>();

  getAllTutorials(){
    this.http.get<{message: String, tutorials: any}>('http://localhost:3000/api/tutorials')
    .pipe(map((tutData)=>{
      return tutData.tutorials.map((tutorial:
        {_id: any, tutID: any, description: any, date: any,
        time: any, studentLevel:any, numOfStudents:any, school: any, status: any;})=>{
          return{
            id: tutorial._id,
            tutID: tutorial.tutID,
            description: tutorial.description,
            date: tutorial.date,
            time: tutorial.time,
            studentLevel: tutorial.studentLevel,
            numOfStudents: tutorial.numOfStudents,
            school: tutorial.school,
            Status: tutorial.status,
          }
        })
    }))
    .subscribe((transformedTutorials)=>{
      this.tutorials= transformedTutorials;
      this.tutorialUpdated.next([...this.tutorials]);
    })
  }
  getTutorial(id: string){
    return {...this.tutorials.find(p => p.id===id)};
  }

  getSchoolofResource(resourceType: String){
    let schools: School[]=[];
    for(let i=0;i<this.tutorials.length;i++){
      if(this.tutorials[i].tutID === resourceType ){
        let school = this.schoolService.getschoolByID(this.tutorials[i].school);
        if(school!=null)
        schools.push(school);
      }
    }
    return schools;
  }

  addTutorial(tutID:String, description:String, date: Date, time: String, studentLevel:String, numOfStudents:Number,
     schoolID:String, status:String
    ) {
      const tutorial:  Tutorial= {
        id: null,
        tutID: tutID,
        description:description,
        date: date,
        time:time,
        studentLevel:studentLevel,
        numOfStudents:numOfStudents,
        school: schoolID,
        status:'New'

      }
      this.http.post<{message: string}>('http://localhost:3000/api/tutorials', tutorial)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.tutorials.push(tutorial);
        this.tutorialUpdated.next([...this.tutorials]);
      })

    }
  gettutorialsUpdateListener()
  {
    return this.tutorialUpdated.asObservable();
  }
getTotalTutorial(tutorials: Tutorial, schoolID: String){
  let i =0;
  for(let o=0; o<this.tutorials.length; o++){
    if(this.tutorials[o].school == schoolID&&this.tutorials[o].tutID === tutorials.tutID){
      i++;
    }
  }
  return i;
}
getTutorials(){
  //return this.schools;
  this.http.get<{message: String, tutorials: Tutorial[]}>('http://localhost:3000/api/tutorials')
  .subscribe((resData)=>{
    this.tutorials = resData.tutorials;
    this.tutorialUpdated.next([...this.tutorials]);
  })

}
// getResources(schoolID: String, resource: Resource){
//   let resources = [];
//   if(schoolID!=""){
//     for(let i=0; i<this.resources.length;i++){
//       if(this.resources[i].school===schoolID&&this.resources[i].resource===resource){
//         resources.push(this.resources[i]);
//       }
//     }

//   }
//   return resources;

// }
hasSchool(schoolID: String){
  if(this.tutorials.find(p=>p.school===schoolID))
  return true;
  return false;
}


}
