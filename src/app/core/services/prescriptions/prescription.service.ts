import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Prescription } from '../../interface/prescription.interface';
import { AddPrescription } from '../../interface/add-prescription.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  public apiUrl =  `${environment.apiUrl}/prescribed`;

  constructor(private http: HttpClient) { }

  public getPrescriptions():Observable<Prescription[]>{
    return this.http.get<Prescription[]>(this.apiUrl);
  }

  public createPrescription(newPrescriptionData: AddPrescription): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newPrescriptionData);
  }

  public updatePrescription(updatedPrescriptionData: AddPrescription): Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedPrescriptionData);
  }

  public deletePrescription(prescriptionData: AddPrescription): Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, { body: prescriptionData });
  }
}
