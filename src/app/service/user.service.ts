import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../model/user";

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) {

  }
  public getAllUserForPageByFilter(data: User[]): Observable<any> {
    return this.http.post<any>(API_URL+'/api/users/get-all',data)
  }
  public updateUser(body: any):Observable<any>{
    return this.http.post<any>(API_URL+'/api/users/update/task',body)
  }
  public addUser(body: any):Observable<any>{
    return this.http.post<any>(API_URL+'/api/users/update/task',body)
  }
  // public deleteBookItems(ids:any[]):Observable<any>{
  //   const  params= new HttpParams().set('ids',ids.join(','));
  //   return this.http.delete<any>(API_URL+'/api/book/delete-by-ids',{params})
  // }
  //
  // public getExportExcelFile(data:any):Observable<any>{
  //   const headers= new HttpHeaders().append('Content-Type', 'application/json');
  //   return this.http.post<Blob>(API_URL+'/api/book/export-excel',data,{headers, responseType:'blob'as 'json'});
  // }
}
