import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  GetMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'user/GetUsers');
  }
}
