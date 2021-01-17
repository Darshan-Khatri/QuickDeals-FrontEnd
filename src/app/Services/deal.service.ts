import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DealService {

  baseUrl = "http://localhost:49544/api/";

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login' , model).pipe(
      map((response:any) => {
        const user = response;
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  setCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

}
