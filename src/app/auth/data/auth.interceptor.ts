import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    const clonedRequest = token
        ? req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
          })
        : req;

    return next(clonedRequest);
};
