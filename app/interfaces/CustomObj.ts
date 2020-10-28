import { Injectable } from '@angular/core';
import {objMateriel} from './IntMateriel';

export interface CustomObj {
  //title: string;
 // description: string;
  success: boolean;
  data:any;
  message:string;
}

@Injectable()
export abstract class myCustomObj {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getObj(): CustomObj[];
}