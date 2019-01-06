import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {


     baseurl: string = this.configService.getConfiguration().webApiBaseUrl;
     // headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
     // options = new RequestOptions({ headers: this.headers, withCredentials: true }); // Create a request option
     
     
     
     get<T>(url: string): Observable<T> {
        this.baseurl='';
       return this.httpClient.get<T>(this.baseurl + url,{params:{add_user: 'yes'}}).pipe(
           catchError((error: any) => this.handleErrors(error))
       )
    }

    // post(url: string, payload: any): Observable<Response>  {
    //     let bodyString = JSON.stringify(payload); // Stringify payload
       
    //     return this.http.post(this.baseurl + url, bodyString, this.options) // ...using post request
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }   

    // put(url: string, payload: any): Observable<Response>  {
    //     let bodyString = JSON.stringify(payload); // Stringify payload
    //     return this.http.put(this.baseurl + url, bodyString, this.options) // ...using post request
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }


    //  delete(url: string): Observable<Response> {
    //    return this.http.get(url)
    //    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }

    handleErrors(error: HttpErrorResponse) {
        // Todo -> Send the error to remote logging infrastructure
        console.error(error); // log to console instead
        const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `{error code: ${error.status}, body: "${error.message}"}`;
	   
      // -> Return a safe result.
      return throwError(message);
    }

     constructor(private httpClient: HttpClient, private configService: ConfigService) { }

}