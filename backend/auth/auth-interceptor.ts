import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CurrentUserService } from "src/app/service/currentUser.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private currentUserService: CurrentUserService, private authService:AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+authToken)
    });
    return next.handle(authRequest);
  }
}
