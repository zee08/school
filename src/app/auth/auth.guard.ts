// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { UserService } from 'src/app/service/user.service';
// import { CurrentUserService } from '../service/currentUser.service';
// import {Observable} from 'rxjs';
// import { Router, UrlTree } from '@angular/router';
// import { Injectable } from '@angular/core';
// @Injectable()
// export class AuthGuard implements CanActivate{

//   constructor(private currentUser: CurrentUserService,  private router:Router){}
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//     const isAuth = this.currentUser.getIsAuth();

//      if(!isAuth){
//       this.router.navigate(['/login']);
//     }
//     return isAuth;
//   }

// }
