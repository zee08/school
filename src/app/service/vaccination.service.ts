// import { Injectable } from '@angular/core';
// import { map } from 'rxjs/operators';
// import { Subject } from 'rxjs';
// import { Vaccination } from '../model/vaccination.model';
// import { User } from '../model/user.model';
// import { SchoolService } from './school.service';
// import { RequestService } from './request.service';

// import { School } from '../model/school.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class VaccinationService {
//   private vaccinations: Vaccination[] = [];
//   private vaccinationUpdated = new Subject<Vaccination[]>();

//   constructor(public schoolService:SchoolService, public vaccineService:RequestService){}

//   getVaccinations(){
//     // this.http.get<{message: string, vaccinations: any}>('http://localhost:3000/api/vaccinations')
//     // .pipe(map((vaccinationData) => {
//     //   return vaccinationData.vaccinations.map((vaccination:
//     //     { _id: any; vaccinationID: any; batch: any; centre: any;
//     //       user: any; status: any; Appointdate: any; }) => {
//     //     return {
//     //       id : vaccination._id,
//     //       vaccinationID: vaccination.vaccinationID,
//     //       batch: vaccination.batch,
//     //       centre: vaccination.centre,
//     //       user: vaccination.user,
//     //       status: vaccination.status,
//     //       Appointdate: vaccination.Appointdate
//     //     };
//     //   });
//     // }))
//     // .subscribe((Transformedvaccinations)=>{
//     //   this.vaccinations = Transformedvaccinations;
//     //   this.vaccinationUpdated.next([...this.vaccinations]);
//     // })
//     return this.vaccinations;
//   }

//   getVaccination(id:string){
//     return{...this.vaccinations.find(p=>p.id === id)};
//   }

//   // updateVaccination(updateVac:Vaccination){
//   //   const vaccination :Vaccination= {
//   //     id: updateVac.id,
//   //     vaccinationID: updateVac.vaccinationID,
//   //     batch: updateVac.batch,
//   //     centre: updateVac.centre,
//   //     user: updateVac.user,
//   //     status: updateVac.status,
//   //     Appointdate: updateVac.Appointdate,
//   //   };
//   //   this.http.put('http://localhost:3000/api/vaccinations/'+updateVac.id, vaccination)
//   //   .subscribe(response => console.log(response));
//   // }

//   addVaccinations(vaccinationID: String,
//     resourceID: String,centreID: String,userID: String, Appointdate: Date,school: School) {
//       const vac: Vaccination = {
//         id : "",
//         vaccinationID: vaccinationID,
//         resource: resourceID,
//         centre: centreID,
//         user: userID,
//         status: "Pending", //pending approve completed
//         Appointdate: Appointdate
//       }
//       // this.http.post<{message:string}>('http://localhost:3000/api/vaccinations',vac)
//       // .subscribe((responseData)=>{
//       //   console.log(responseData.message);
//       //   this.vaccinations.push(vac);
//       //   this.vaccinationUpdated.next([...this.vaccinations]);
//       //   return;
//       // })
//       // this.vaccinations.push(vac);
//       // this.vaccineService.updateBatchPending(batchID);
//       // this.vaccinationUpdated.next([...this.vaccinations]);
//       // return;
// this.vaccinations.push(vac);
//   }

//   getVaccinationsByCentre(centreID: String){
//     let vaccinations = [];
//     if (centreID!=""){
//       for (let i=0;i<this.vaccinations.length;i++){
//             if (this.vaccinations[i].centre===centreID){
//               vaccinations.push(this.vaccinations[i]);
//             }
//           }
//         }

//     return vaccinations;
//   }

//   checkUserAppointed(resourceID:String,user:User) {
//     let appointed = false;
//     for (let i=0;i<this.vaccinations.length;i++){
//       if (this.vaccinations[i].resource == resourceID){
//         appointed = true;
//       }
//     }
//     return appointed;
//   }

//   // checkAvailable(batchID:String){
//   //   let batch = this.vaccineService.getResourcebyID(batchID);
//   //   if (batch!=undefined){
//   //     let i=batch.quantity-batch.pending-batch.administered;
//   //     if (i<1){
//   //       return false;
//   //     }
//   //     let now = new Date();
//   //     if (now > batch.expiry){
//   //       return false;
//   //     }
//   //     return true;
//   //   }
//   //   return true;
//   // }

//   approveVaccination(vaccination:Vaccination){
//     vaccination.status = "Approved";
//     // this.updateVaccination(vaccination);
//     // this.vaccinationUpdated.next([...this.vaccinations]);
//     return;
//   }

//   completeVaccination(vaccination:Vaccination){
//     vaccination.status = "Completed";
//     // this.updateVaccination(vaccination);
//     // this.vaccineService.updateBatchAdministered(vaccination.batch);
//     // this.vaccinationUpdated.next([...this.vaccinations]);
//     return;
//   }

//   declineVaccination(vac: Vaccination){
//     console.log(vac);

//     // this.http.delete('http://localhost:3000/api/vaccinations/'+vac.id)
//     // .subscribe(()=>{
//     //   console.log('Deleted');
//     // });
//     // this.vaccineService.updateRejectedPending(vac.batch);
//     // this.vaccinationUpdated.next([...this.vaccinations]);
//     return;
//   }

//   getVaccinationbyID(vaccinationID: String){
//     let found = this.vaccinations.find(i=>i.vaccinationID === vaccinationID);
//     return found;
//   }


//   getVaccinationUpdateListener()
//   {
//     return this.vaccinationUpdated.asObservable();
//   }
// }
