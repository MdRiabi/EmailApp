
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest,HttpHandler,HttpEvent,HttpEventType } from "@angular/common/http";
import { filter, Observable, pipe, tap } from "rxjs";


@Injectable()
export class AuthHttpIntercepetor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       //modify or outgoing the request

        const modifiedReq = req.clone({
            withCredentials: true,
        })

        return next.handle(modifiedReq);
        /* .pipe(
            filter(val => val.type ===  HttpEventType.Sent),
            tap(val =>{
                console.log('sent the request');
              /*   if(val.type === HttpEventType.Sent){
                    console.log('request was sent to the server' );
                }
                if(val.type === HttpEventType.Response){
                    console.log('got a response from a API', val);

                } 

            })
        ) */
         
    }
}
