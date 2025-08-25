import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, ObservableLike } from 'rxjs';
import { AddRoom, ResponseModel, Room } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiUrl =`${environment.apiUrl}/room`

  constructor(private http: HttpClient) { }

  getAllRoomDetails():Observable<Room[]>{
    return this.http.get<Room[]>(this.apiUrl);
  }

  createNewRoomRecord(roomData: AddRoom):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, roomData)
  }

  updateRoomDetail(roomData: AddRoom):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, roomData);
  }

  deleteRoomRecord(roomData: AddRoom):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl,{ body: roomData })
  }
}
