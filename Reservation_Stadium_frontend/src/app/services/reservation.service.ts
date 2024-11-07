import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl:string  = " http://localhost:8080/api/reservations";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
  };


  constructor(private httpclient: HttpClient) { }
 
  makeReservation( stadiumId: any,date : any, timing :any): Observable<any> {
    console.log(this.httpOptions)
    // return this.httpclient.post<any>(`${this.apiUrl}`, { stadiumId, timing ,date }, this.httpOptions );
        return this.httpclient.post<any>(`${this.apiUrl}/post`, { stadiumId, timing ,date }, this.httpOptions );

  }
  

  getReservations(id:any):Observable<{userFinded:any}>{
    
    return this.httpclient.get<{userFinded:any}>(`${this.apiUrl}/${id}`,this.httpOptions);
  }
}
