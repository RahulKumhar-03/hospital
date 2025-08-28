import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Block } from '../../interface/block.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  public apiUrl =`${environment.apiUrl}/block`

  constructor(private http: HttpClient) { }

  public getBlocks():Observable<Block[]>{
    return this.http.get<Block[]>(this.apiUrl);
  }

  public createBlock(blockData: Block):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, blockData)
  }

  public updateBlock(blockData: Block):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, blockData);
  }

  public deleteBlock(blockData: Block):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl,{ body: blockData })
  }
}
