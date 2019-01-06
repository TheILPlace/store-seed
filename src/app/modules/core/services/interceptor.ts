import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
    HttpParams
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const AUTH_TOKEN = 'MY_AUTH_TOKEN';
const token_in_param = 'add_user';


@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor() { }

    createHeaders(request: HttpRequest<any>) {
        
        //search for token name in params
        
        
        let token_in_param_value = '';

        let params = request.params;

        if (
            params && 
            (
                params.has(token_in_param)
            )
        ) {
            token_in_param_value = params.get(token_in_param);
           // request = removeCustomParams(request, token_in_param);

        }



        let headers = request.headers;

        // modify request
        if (AUTH_TOKEN) {
            //headers.set('Authorization', `Bearer ${localStorage.getItem('MY_TOKEN')}`);
            headers = headers.append('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
        }

        if (token_in_param_value) {
            headers = headers.append(token_in_param, token_in_param_value);
        }
        
        return headers;
    }


    // intercept request and add token
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        


        request = request.clone({
          headers: this.createHeaders(request),
          params: request.params.delete(token_in_param)
        });
        //request.headers.set(TOKEN_TO_ADD, token_to_add_value);
        
        
        
    //     setHeaders: {
    //        Authorization: `Bearer ${localStorage.getItem('MY_TOKEN')}`
    //    }

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {

                        //extract token
                    }
                }, error => {
                    // http response status code
                    console.log("----response----");
                    console.error("status code:");
                    console.error(error.status);
                    console.error(error.message);
                    console.log("--- end of response---");

                })
            )

    };


}


function removeParam(params: HttpParams, param: string): HttpParams {
    return params.delete(param);
}

// function removeCustomParams(request: HttpRequest<any>, token: string): HttpRequest<any> {
//     // The if statement here is just a sanity check; it appears that by the time
//     // this interceptor is called, the params property is always defined, even if
//     // it's not provided when the HTTP request is created.
//     /* istanbul ignore else */
//     if (request.params) {
//         let params = request.params;
//         params = params.delete(token);
//         let newrequest = request.clone(
//             {
//                 params: params

//             }
//         );
//         return newrequest;
//     }

//     return request;
// }

//  function createNewHttpParams(params: {}): HttpParams {
//     let httpParams: HttpParams = new HttpParams();
//     Object.keys(params).forEach(param => {
//         if (params[param]) {
//             httpParams = httpParams.set(param, params[param]);
//         }
//     });

//     return httpParams;
// }
