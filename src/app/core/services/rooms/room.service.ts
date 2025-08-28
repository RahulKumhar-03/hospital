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

  public getRooms():Observable<Room[]>{
    return this.http.get<Room[]>(this.apiUrl);
  }

  public createRoom(newRoomData: AddRoom):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl, newRoomData)
  }

  public updateRoom(updatedRoomData: AddRoom):Observable<ResponseModel>{
    return this.http.put<ResponseModel>(this.apiUrl, updatedRoomData);
  }

  public deleteRoom(roomData: AddRoom):Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(this.apiUrl,{ body: roomData })
  }
}
