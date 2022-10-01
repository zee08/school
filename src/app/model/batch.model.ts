import { Time } from "@angular/common";

export interface Batch{
  id: String;
  batchID: String;
  batchNumber: String;
  expiry: Date;
  quantity: number;
  pending: number;
  administered: number;
  centre: String;
  vaccine: String;

}

export interface Tutorial{
  description: String;
  date: Date;
  time: Time;
  studentLevel: String;
  numOfStudents: number;
  status: String;
}
