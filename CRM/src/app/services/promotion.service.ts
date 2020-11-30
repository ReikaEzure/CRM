import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Promotion } from '../models/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotions : Promotion[];
  promotion: Promotion;

  _url = 'http://localhost:3000/promo';

  constructor(private _http: HttpClient) { }

  getPromotions(){
    return this._http.get(`${this._url}`);
  }

  getPromotion(id: number){
    return this._http.get(`${this._url}/${id}`);
  }

  savePromotion(promo: Promotion){
    return this._http.post(`${this._url}`, promo);
  }

  deletePromotion(id: String | number){
    return this._http.delete(`${this._url}/${id}`);
  }

  updatePromotion(id: String | number, promo: Promotion): Observable<Promotion>{
    return this._http.put(`${this._url}/${id}`, promo);
  }

}
