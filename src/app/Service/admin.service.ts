import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Deal } from '../models/deal';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;
  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    ) { }

    /**
     * Get list of deals which has more than 2 likes and it is NOT approved/reject by admin.
     */
    GetQualifiedDeals() {
      return this.http.get<Deal[]>(this.baseUrl + 'admin/BestDeals');
    }

    ApproveDeal(dealId: number) {
      return this.http.post(this.baseUrl + 'admin/approve/' + dealId, {});
    }

    RejectDeal(dealId: number) {
      return this.http.post(this.baseUrl + 'admin/reject/' + dealId, {});
    }

}
