import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).do(event => {
            console.log(event);
        });
    }
}
