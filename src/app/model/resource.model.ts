import { Time } from "@angular/common";

export interface Resource{
  // id: String;
  // resourceID: String;
  // resourceNumber: String;
  description:String;
  quantity: number;
  resourceType:String;
  // centre: String;
  // vaccine: String;



}

export interface Tutorial{
  description: String;
  date: Date;
  time: Time;
  studentLevel: String;
  numOfStudents: number;
  status: String;
}
