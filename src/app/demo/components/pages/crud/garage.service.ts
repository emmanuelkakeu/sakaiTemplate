import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Car} from './models'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GarageService {


   URL = `${environment.apiUrl}/cars`;
  // GET_URL =  `${environment.getUrl}/cars`;



        car = Object
        formulaireGroup: FormGroup;

        constructor(private http: HttpClient) { }

        getCars(): Observable<any> {
            return this.http.get<Car[]>(this.URL);
        }

       // getsCars(){
         //   return this.http.get(this.URL);  }


     addCar(car: Car): Observable<any> {

        return this.http.post<any>(this.URL,car);
     }







}
