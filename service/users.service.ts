import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiEndPoint: string = "http://localhost:8080/api/v1/user/";

  constructor(private http: HttpClient) { }

  // Method to fetch all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiEndPoint + 'getAll');
  }

  // Method to delete a user by ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiEndPoint + 'delete/' + id);
  }

  // Method to add or update a user
  addUpdateUser(userObj: {
    id?: number;
    fullName: string;
    email: string;
    mobile: number;
    username: string;
    password: string;
    role: string;
  }): Observable<any> {
    if (userObj.id) {
      // Update user
      return this.http.put(this.apiEndPoint + 'update/' + userObj.id, userObj);
    } else {
      // Create user
      return this.http.post(this.apiEndPoint + 'create', userObj);
    }
  }

  // Method to sign up a new user
  signupUser(userObj: {
    fullName: string;
    email: string;
    mobile: number;
    username: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(this.apiEndPoint + 'signup', userObj);
  }
}
