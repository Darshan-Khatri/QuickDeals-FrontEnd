import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment, Deal } from '../models/deal';
import { DealParams } from '../models/dealParams';
import { NewDeal } from '../models/new-deal';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  baseUrl = environment.apiUrl;
  dealParams: DealParams;

  constructor(private http: HttpClient) {
    this.dealParams = new DealParams();
  }

  getDealParams() {
    return this.dealParams;
  }

  setDealParams(params: DealParams) {
    this.dealParams = params;
  }

  resetFilter() {
    let dealsParams = new DealParams();
    return dealsParams;
  }

  GetAllDeal(dealParams: DealParams) {
    //return this.http.get<Deal[]>(this.baseUrl + 'deals/GetDeals');
    let params = getPaginationHeader(this.dealParams.pageNumber, this.dealParams.pageSize);

    params = params.append('category', dealParams.category);
    params = params.append('price', dealParams.price);
    params = params.append('rating', dealParams.rating);
    params = params.append('date', dealParams.date);
    return getPaginatedResult<Deal[]>(this.baseUrl + 'deals/GetDealsPaginationFilter',params, this.http).
    pipe(map(responseFromServer => {
      console.log('responseFromServer', responseFromServer);
      return responseFromServer;
    }));
  }

  PostDeal(body: any) {
    return this.http.post<any>(this.baseUrl + 'deals/PostNewDeal', body);
  }

  AddLike(id: number) {
    return this.http.post<any>(this.baseUrl + 'ratings/AddLike/' + id, {});
  }

  AddDisLike(id: number) {
    return this.http.post<any>(this.baseUrl + 'ratings/AddDislike/' + id, {});
  }

  GetDeal(dealId: number) {
    return this.http.get<Deal>(this.baseUrl + 'deals/GetDeal/' + dealId);
  }

  GetFrontPageDeals() {
    return this.http.get<Deal[]>(this.baseUrl + 'deals/FrontPageDeals');
  }

  AddComment(body: any) {
    return this.http.post<any>(this.baseUrl + 'comments/AddComment', body);
  }
}
