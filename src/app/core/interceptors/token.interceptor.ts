import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenManager } from '../managers';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenManager = inject(TokenManager);
  const token = tokenManager.token;

  if ( token ) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
