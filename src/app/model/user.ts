import {Schedule} from "./schedule";
import {MarkType} from "./mark-type";

export class User {
  id?:number;
  name?:String;
  dateOfBirth?:Date;
  startWorkingDate?:Date;
  markType?: number;
  schedule?:Schedule;
}
