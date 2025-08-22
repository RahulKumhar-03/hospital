import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Nurse,ResponseModel } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  apiUrl = `${environment.apiUrl}/nurse`
  constructor(private http: HttpClient) { }

  getAllNurseDetails():Observable<Nurse[]>{
    return this.http.get<Nurse[]>(this.apiUrl)
  }

  createNewNurse(newNurseData: Nurse): Observable<ResponseModel>{
      return this.http.post<ResponseModel>(this.apiUrl, newNurseData)
    }
  
  updateNurseDetails(updatedNurseData: Nurse):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedNurseData)
  }
  
  deleteNurseRecord(nurseData: Nurse):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: nurseData})
  }
}
