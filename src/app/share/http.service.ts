import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  private address : string = "http://localhost/snowmilk-backend/api/";

  requestGet(url:string, accessToken?:string){
    return this.http
      .get(`${this.address}${url}`,{
        headers: this.appendHeaders(accessToken),
      })
      .pipe(catchError(err=>this.handleError(err)))
  }

  requestPost(url:string, body:any){
    return this.http 
      .post(`${this.address}${url}`,body)
      .pipe(catchError(err=>this.handleError(err)));
  }

  requestPut(url:string, accessToken?:string, model?:any){
    return this.http
      .put(`${this.address}${url}`,model, {
        headers: this.appendHeaders(accessToken),
      })
      .pipe(catchError(err=> this.handleError(err)));
  }

  requestDelete(url:string, accessToken?:string){
    return this.http.delete(`${this.address}${url}`,{
      headers: this.appendHeaders(accessToken),
    })
    .pipe(catchError(err=>this.handleError(err)));
  }

  private handleError(errResponse:HttpErrorResponse):Observable<any>{
    if(errResponse.error && errResponse.error.message){
      errResponse = errResponse.error.message
    }throw errResponse;
  }

  appendHeaders(accessToken: any){
    var headers = {Authorization:""};
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
    return new HttpHeaders(headers)
  }
}
