import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Procedure, ResponseModel } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  apiUrl = `${environment.apiUrl}/procedure`;

  constructor(private http: HttpClient) { }

  getAllProcedures():Observable<Procedure[]>{
    return this.http.get<Procedure[]>(this.apiUrl);
  }

  updateProcedureRecord(updatedProcedureData:Procedure):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedProcedureData);
  }

  createNewProcedureRecord(newProcedureRecord: Procedure): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newProcedureRecord);
  }

  deleteProcedureRecord(procedureData: Procedure):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl,{ body: procedureData });
  }
}
