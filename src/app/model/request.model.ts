import { Time } from "@angular/common";

export interface Resource{

  description:String;
  quantity: number;
  resourceType:String;
  school: String;
  status: String;




}

export interface Tutorial{
  description: String;
  date: Date;
  time: Time;
  studentLevel: String;
  numOfStudents: number;
  status: String;
  school: String;
}
