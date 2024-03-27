import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Car} from './models'
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GarageService {


   URL = `${environment.apiUrl}/cars`;
   urls = `${environment.apiUrl}`;
  // GET_URL =  `${environment.getUrl}/cars`;



        car = Object


        constructor(private http: HttpClient) { }

        getCars(): Observable<any> {
            return this.http.get<Car[]>(this.URL);
        }



       // getsCars(){
         //   return this.http.get(this.URL);  }


     addCar(car: Car): Observable<any> {

        return this.http.post<any>(this.URL,car);
     }

     deleteSelecteCar(id: number): Observable<any> {
        const url = `${this.urls}/car/${id}`; // Remplacez 'objects' par le nom de votre endpoint et 'id' par l'identifiant de l'objet à supprimer
        return this.http.delete(url);
      }

      updateCar(car: Car): Observable<any> {
        const url = `${this.urls}/car/${car.id}`;
        return this.http.put(url, car);
      }



}
