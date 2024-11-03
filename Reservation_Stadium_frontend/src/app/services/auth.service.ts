import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl:string  = " http://localhost:8080/auth";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };


  constructor(private httpclient: HttpClient) { }
 
  register(obj: any): Observable<{ msg: any }> {
    return this.httpclient.post<{ msg: any }>(`${this.authUrl}/register`, obj );
  }
  

  login(obj:any): Observable<{ msg: string, token: Token}> {
    return this.httpclient.post<{ msg: string, token:Token }>(`${this.authUrl}/login`, obj);
  }

  getUserBydId(id:any):Observable<{userFinded:any}>{
    
    return this.httpclient.get<{userFinded:any}>(`${this.authUrl}/getUserById/${id}`,this.httpOptions);
  }

 }
