import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOnCall, OnCall, ResponseModel } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OnCallService {
  apiUrl = `${environment.apiUrl}/oncall`;
  
  constructor(private http: HttpClient) {}

  getAllOnCallDetails(): Observable<OnCall[]> {
    return this.http.get<OnCall[]>(this.apiUrl)
  }

  createNewOnCallRecord(newOnCallData: AddOnCall): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newOnCallData)
  }

  updateOnCallDetails(updatedOnCallData: AddOnCall):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedOnCallData)
  }

  deleteOnCallRecord(onCallData: AddOnCall):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: onCallData})
  }
}
