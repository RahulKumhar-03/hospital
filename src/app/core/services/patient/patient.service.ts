import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../interface/patient.interface';
import { PatientResponseModel } from '../../interface/patient-response-model.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public apiUrl = `${environment.apiUrl}/patients`;
  
  constructor(private http: HttpClient) {}

  public getPatient(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl)
  }

  public createPatient(newPatientData: Patient): Observable<PatientResponseModel>{
    return this.http.post<PatientResponseModel>(this.apiUrl, newPatientData)
  }

  public updatePatient(updatedPatientData: Patient):Observable<PatientResponseModel>{
    return this.http.put<PatientResponseModel>(this.apiUrl, updatedPatientData)
  }

  public deletePatient(patientData: Patient):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: patientData})
  }
}
