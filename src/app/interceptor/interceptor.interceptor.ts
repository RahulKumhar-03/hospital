import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = environment.token;

  const request = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  });
  return next(request);
};
