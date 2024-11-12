import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/v1/user'; // Adjust as necessary for your API

  constructor(private http: HttpClient) {}
 // Verify user login
 verifyLogin(loginData: { username: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/verify`, loginData);
}
}
