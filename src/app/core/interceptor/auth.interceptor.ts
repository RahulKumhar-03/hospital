import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI1NiIsInRlbmFudF9lbWFpbCI6InJhaHVsLmt1bWhhckBnb2RpZ2l0YWx0Yy5jb20iLCJjcmVhdGVkX29uIjoiOC8yMC8yMDI1IDI6NTE6NDggUE0iLCJleHAiOjE3NjM5MDM0Njd9.Q8ijYD9SAiWpZPWRr9Frin2ZZD6ybEVR59zx1RD7WbA';
  
  const request = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  });
  return next(request);
};
