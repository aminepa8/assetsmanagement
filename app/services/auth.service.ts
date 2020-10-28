import { Injectable } from '@angular/core';
import {apiUrl,apiKey} from '../../app/apiconfig/module';
import { HttpClient ,HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Http , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(public http: HttpClient) { }
   
   login(code:string) {
    return new Promise((resolve, reject) => {
    console.log("Entrer the Login Func");
    let result ;
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type', 'application/json')
    .set('Authorization', apiKey);
  let options ={headers:headers};
    this.http.get(apiUrl+'/api/sessionetat/'+code,options).pipe(map((response :Response) => {
      result = JSON.stringify(response);
    
      resolve(result);
    },(err) => {
      reject(err);
}
    )).subscribe(result => {
     
    });
    
  });
}
}
