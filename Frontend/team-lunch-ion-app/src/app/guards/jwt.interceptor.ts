import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../users/account.service';
import { UserContract } from '../contracts/user-contract';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    user: UserContract;

    constructor(private accountSvc: AccountService) {
        this.accountSvc.user.subscribe(x => this.user = x);
     }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const isApiUrl = request.url.startsWith(environment.api.intercept);
        if (isApiUrl && this.user) {
            request = request.clone({
                setHeaders: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    Authorization: `Bearer ${this.user.jwtToken}`
                }
            });
            console.log('intercettato! utente: ' + this.user.username);

        }


        return next.handle(request);
    }
}
