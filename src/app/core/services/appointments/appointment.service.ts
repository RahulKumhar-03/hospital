import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AddAppointment } from '../../interface/add-appointment.interface'
import { Observable } from 'rxjs';
import { Appointment } from '../../interface/appointment.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public apiUrl = `${environment.apiUrl}/appointment`;
  
  constructor(private http: HttpClient) {}

  public getAllAppointmentDetails(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl)
  }

  public createNewAppointmentRecord(newAppointmentData: AddAppointment): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newAppointmentData)
  }

  public updateAppointmentDetails(updatedAppointmentData: AddAppointment):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedAppointmentData)
  }

  public deleteAppointmentRecord(appointmentData: AddAppointment):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl, {body: appointmentData})
  }
}
