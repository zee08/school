export interface Request{
  // requestId: string;
  // description: string;
  // datetime: Date;
  // studentlevel: string;
  // numofexpectedstudents: string;
  // status: string;
  // schoolname: string;
  // city: string;
  // resourcedescription: string;
  // resourcetype: string;
  // resourcenum: string;
  // requesttype: string;
  // requestdate: Date;
  // remarks: string;
  // volunteerName: string;
  id: string;
  reqID:String;
  description:String;
  quantity: number;
  resourceType:String;
  tutDescription:String;
  tutdate:Date;
  time:String;
  studentLevel: String;
  numOfStudents: Number;
  reqDate:Date;
  schoolname: String;
  schoolID:String;
  city:String,
  status: String;
  remarks:String;
  reqType:String;
  username:String;
}
