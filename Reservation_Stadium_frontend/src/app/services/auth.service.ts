import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl:string  = " http://localhost:9000/api/users";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
  };


  constructor(private httpclient: HttpClient) { }
 
  register(obj: any): Observable<any> {
    return this.httpclient.post<any>(`${this.authUrl}/register`, obj );
  }
  

  login(obj:any): Observable<any> {
    return this.httpclient.post<any>(`${this.authUrl}/login`, obj).pipe(
      tap(response => {
        if (response.jwt) {
          this.saveToken(response.jwt);
        }
      })
    );
  }

  getUserBydId(id:any):Observable<{userFinded:any}>{
    
    return this.httpclient.get<{userFinded:any}>(`${this.authUrl}/getUserById/${id}`,this.httpOptions);
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearToken(): void {
    sessionStorage.removeItem('token');
  }

 }
