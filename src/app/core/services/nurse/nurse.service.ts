import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Nurse } from '../../interface/nurse.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  public apiUrl = `${environment.apiUrl}/nurse`
  constructor(private http: HttpClient) { }

  public getNurses():Observable<Nurse[]>{
    return this.http.get<Nurse[]>(this.apiUrl)
  }

  public createNurse(newNurseData: Nurse): Observable<ResponseModel>{
      return this.http.post<ResponseModel>(this.apiUrl, newNurseData)
    }
  
  public updateNurse(updatedNurseData: Nurse):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedNurseData)
  }
  
  public deleteNurse(nurseData: Nurse):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: nurseData})
  }
}
