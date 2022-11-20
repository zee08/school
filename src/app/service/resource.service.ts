import { Injectable } from '@angular/core';
import { Resource } from '../model/request.model';
import { Subject } from 'rxjs';
import { SchoolService } from './school.service';
import { HttpClient } from '@angular/common/http';
import { School } from '../model/school.model';
import { map  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(public schoolService: SchoolService, private http: HttpClient,){}

  private resources: Resource[] = [];
private resource:Resource;
  private resourceUpdated = new Subject<Resource[]>();

  getAllResources(){
    this.http.get<{message: String, resources: any}>('http://localhost:3000/api/resources')
    .pipe(map((resData)=>{
      return resData.resources.map((resource:
        {_id: any, resID: any, description: any, quantity: any,
        resourceType: any, school: any, status: any; })=>{
          return{
            id: resource._id,
            resID: resource.resID,
            description: resource.description,
            quantity: resource.quantity,
            resourceType: resource.resourceType,
            school: resource.school,
            Status: resource.status,
            //creator: resource.creator
          }
        })
    }))
    .subscribe((transformedResources)=>{
      this.resources= transformedResources.resources;
      this.resourceUpdated.next([...this.resources]);
    })
  }
  getResource(id: string){
    return {...this.resources.find(p => p.id===id)};
  }

  getSchoolofResource(resourceType: String){
    let schools: School[]=[];
    for(let i=0;i<this.resources.length;i++){
      if(this.resources[i].resID === resourceType ){
        let school = this.schoolService.getschoolByID(this.resources[i].school);
        if(school!=null)
        schools.push(school);
      }
    }
    return schools;
  }

  addResource(resID:String, description:String, quantity: number, resourceType: String, schoolname:String,
    status:String
    ) {
      const resource:  Resource= {
        id: null,
        resID: resID,
        description:description,
        quantity: quantity,
        resourceType:resourceType,
        school: schoolname,
        status:'New',
     // creator:''

      }
      this.http.post<{message: string, resourceId: string}>('http://localhost:3000/api/resources', resource)
      .subscribe((responseData)=>{
        const id = responseData.resourceId;
      resource.id = id;
        console.log(responseData.message);
        this.resources.push(resource);
        this.resourceUpdated.next([...this.resources]);
      })

    }
  getresourcesUpdateListener()
  {
    return this.resourceUpdated.asObservable();
  }
getTotalResource(resource: Resource, schoolname: String){
  let i =0;
  for(let o=0; o<this.resources.length; o++){
    if(this.resources[o].school == schoolname&&this.resources[o].resourceType === resource.resourceType){
      i++;
    }
  }
  return i;
}

getStatus(){
  this.resource.status;
}

getResources(){
  // return this.posts;
  this.http.get<{message:string, resources: any}>('http://localhost:3000/api/resources')
 .pipe(map((resourceData)=>{
  return resourceData.resources.map(resource =>{
    return {
      resID: resource.resID,
      description: resource.description,
      quantity:resource.quantity,
      resourceType: resource.resourceType,
      school: resource.school,
      status: resource.status,
      id: resource._id,
    //  creator: resource.creator
    };
    });
 }))
 .subscribe(transformedResources =>{
  this.resources = transformedResources;
  this.resourceUpdated.next([...this.resources]);
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
deleteResource(resourceId:string){
  this.http.delete('http://localhost:3000/api/resources/'+resourceId)
  .subscribe(()=> {
    const updatedResources = this.resources.filter(resource =>resource.id !== resourceId);
    this.resources = updatedResources;
    this.resourceUpdated.next([...this.resources]);

  });
}
hasSchool(schoolID: String){
  if(this.resources.find(p=>p.school===schoolID))
  return true;
  return false;
}


}
