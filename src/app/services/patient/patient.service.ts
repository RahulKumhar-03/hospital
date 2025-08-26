import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Patient, PatientResponseModel, ResponseModel } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
   apiUrl = `${environment.apiUrl}/patients`;
  
  constructor(private http: HttpClient) {}

  getAllPatientRecords(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl)
  }

  createNewPatient(newPatientData: Patient): Observable<PatientResponseModel>{
    return this.http.post<PatientResponseModel>(this.apiUrl, newPatientData)
  }

  updatePatientDetails(updatedPatientData: Patient):Observable<PatientResponseModel>{
    return this.http.put<PatientResponseModel>(this.apiUrl, updatedPatientData)
  }

  deletePhysician(patientData: Patient):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: patientData})
  }
}
