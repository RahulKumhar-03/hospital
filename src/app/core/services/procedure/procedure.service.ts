import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Procedure } from '../../interface/procedure.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  public apiUrl = `${environment.apiUrl}/procedure`;

  constructor(private http: HttpClient) { }

  public getAllProcedures():Observable<Procedure[]>{
    return this.http.get<Procedure[]>(this.apiUrl);
  }

  public updateProcedureRecord(updatedProcedureData:Procedure):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedProcedureData);
  }

  public createNewProcedureRecord(newProcedureRecord: Procedure): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newProcedureRecord);
  }

  public deleteProcedureRecord(procedureData: Procedure):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl,{ body: procedureData });
  }
}
