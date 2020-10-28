import { Injectable } from '@angular/core';

export interface myObj {
  //title: string;
 // description: string;
  success: boolean;
  data:String[];
  message:string;
}

@Injectable()
export abstract class myObjService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getObj(): myObj[];
}