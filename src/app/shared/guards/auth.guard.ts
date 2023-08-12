import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/users/services/auth.service';
import { take, tap } from 'rxjs';

export const authGuard = () => {
  console.log("Guard")
  const authService = inject(AuthService)
  const router = inject(Router)
  return authService.userState$.pipe(
                      take(1),
                      tap((res) => console.log(!!res)),
                      tap((isLoggedIn) => (!!isLoggedIn ? router.navigate(["/user/home"]) : true))
                     )
};
