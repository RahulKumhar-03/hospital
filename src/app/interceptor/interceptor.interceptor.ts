import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI1NiIsInRlbmFudF9lbWFpbCI6InJhaHVsLmt1bWhhckBnb2RpZ2l0YWx0Yy5jb20iLCJjcmVhdGVkX29uIjoiOC8yMC8yMDI1IDI6NTE6NDggUE0iLCJleHAiOjE3NTY0NDc0MDd9.HZIPgfu7I8rw9PdMtrcfajQIwVj_cgDBidB7n6bmTrY';
  
  const request = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  });
  return next(request);
};
