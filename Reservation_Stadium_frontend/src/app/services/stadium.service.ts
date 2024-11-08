import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  stadiumURL:string  = "http://localhost:8080/api/stadiums";

  constructor(private httpclient: HttpClient) { }
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  getAllStadiums(governorate?: string  | null, category?: string | null): Observable<any[]> {
    let params = new HttpParams();

    console.log(governorate)
    console.log(category)

    if (governorate) {
        params = params.set('governorate', governorate);
    }
    if (category) {
        params = params.set('category', category);
    }

    const options = {
        ...this.httpOptions,
        params: params
    };

    return this.httpclient.get<any[]>(`${this.stadiumURL}/get`, options);
  
  }

  getStadium(idStadium :any): Observable<any[]> {
  
    return this.httpclient.get<any>(`${this.stadiumURL}/${idStadium}`);
  }

  createStadium(obj : any): Observable<{msg:any}> {
    return this.httpclient.post<{msg:any}>(`${this.stadiumURL}`,obj, this.httpOptions);
  }
}
