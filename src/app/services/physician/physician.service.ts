import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Physician, PhysicianCreate, ResponseModel } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {
  apiUrl = `${environment.apiUrl}/physician`;
  
  constructor(private http: HttpClient) {}

  getAllPhysicians(): Observable<Physician[]> {
    return this.http.get<Physician[]>(this.apiUrl)
  }

  createNewPhysician(newPhysicianData: PhysicianCreate): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newPhysicianData)
  }

  updatePhysicianDetails(physicianData: PhysicianCreate):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, physicianData)
  }

  deletePhysician(physicianData: PhysicianCreate):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: physicianData})
  }
}
