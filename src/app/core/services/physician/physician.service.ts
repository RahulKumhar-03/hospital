import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Physician } from '../../interface/physician.interface';
import { PhysicianCreate } from '../../interface/physician-create.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {
  public apiUrl = `${environment.apiUrl}/physician`;
  
  constructor(private http: HttpClient) {}

  public getAllPhysicians(): Observable<Physician[]> {
    return this.http.get<Physician[]>(this.apiUrl)
  }

  public createNewPhysician(newPhysicianData: PhysicianCreate): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newPhysicianData)
  }

  public updatePhysicianDetails(physicianData: PhysicianCreate):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, physicianData)
  }

  public deletePhysician(physicianData: PhysicianCreate):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: physicianData})
  }

  public getDetialsById(physicianId: number):Observable<Physician>{
    return this.http.get<Physician>(`${this.apiUrl}/${physicianId}`)
  }
}
