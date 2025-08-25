import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Block, ResponseModel } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  apiUrl =`${environment.apiUrl}/block`

  constructor(private http: HttpClient) { }

  getAllBlockDetails():Observable<Block[]>{
    return this.http.get<Block[]>(this.apiUrl);
  }

  createNewBlockRecord(blockData: Block):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, blockData)
  }

  updateBlockDetail(blockData: Block):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, blockData);
  }

  deleteBlockRecord(blockData: Block):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl,{ body: blockData })
  }
}
