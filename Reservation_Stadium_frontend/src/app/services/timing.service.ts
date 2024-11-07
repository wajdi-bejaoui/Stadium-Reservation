import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimingService {

  timingURL:string  = "http://localhost:8080/api/timings";

  constructor(private httpclient: HttpClient) { }
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  getAllAvailableTimings(stadiumId : any , date : any): Observable<any[]> {
    // let params = new HttpParams();


    // const options = {
    //     ...this.httpOptions,
    //     params: params
    // };


    let params = new HttpParams()
      .set('stadiumId', stadiumId.toString())
      .set('date', date);

    return this.httpclient.get<any[]>(`${this.timingURL}/available`, {params});
  
  }

  getTiming(idTiming :any): Observable<any[]> {
  
    return this.httpclient.get<any>(`${this.timingURL}/${idTiming}`);
  }

  createTiming(obj : any): Observable<{msg:any}> {
    return this.httpclient.post<{msg:any}>(`${this.timingURL}`,obj, this.httpOptions);
  }
}
