import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medication } from '../../interface/medication.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  public apiUrl = `${environment.apiUrl}/medication`;
  
  constructor(private http: HttpClient) { }

  public getMediactions():Observable<Medication[]>{
    return this.http.get<Medication[]>(this.apiUrl);
  }

  public createMedication(newMedicationData: Medication):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newMedicationData);
  }

  public updateMedication(updatedMedication: Medication):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedMedication);
  }

  public deleteMedication(medicationData: Medication):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, { body: medicationData });
  }
}
