import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnCall } from '../../interface/on-call.interface';
import { AddOnCall } from '../../interface/add-on-call.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class OnCallService {
  public apiUrl = `${environment.apiUrl}/oncall`;
  
  constructor(private http: HttpClient) {}

  public getAllOnCallDetails(): Observable<OnCall[]> {
    return this.http.get<OnCall[]>(this.apiUrl)
  }

  public createNewOnCallRecord(newOnCallData: AddOnCall): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newOnCallData)
  }

  public updateOnCallDetails(updatedOnCallData: AddOnCall):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedOnCallData)
  }

  public deleteOnCallRecord(onCallData: AddOnCall):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: onCallData})
  }
}
