import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Deal } from '../models/deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  GetAllDeal() {
    return this.http.get<Deal[]>(this.baseUrl + 'deals/GetDeals');
  }
}
