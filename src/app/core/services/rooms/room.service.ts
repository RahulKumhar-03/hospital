import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../../interface/room.interface';
import { AddRoom } from '../../interface/add-room.interface';
import { ResponseModel } from '../../interface/response-model.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public apiUrl =`${environment.apiUrl}/room`

  constructor(private http: HttpClient) { }

  public getAllRoomDetails():Observable<Room[]>{
    return this.http.get<Room[]>(this.apiUrl);
  }

  public createNewRoomRecord(roomData: AddRoom):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, roomData)
  }

  public updateRoomDetail(roomData: AddRoom):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, roomData);
  }

  public deleteRoomRecord(roomData: AddRoom):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl,{ body: roomData })
  }
}
