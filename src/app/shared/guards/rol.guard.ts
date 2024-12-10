import { CanMatchFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const rolGuard: CanMatchFn = (route) => {
  const userService = inject(UserService);
  const rol = userService.user()?.rol;
  if(rol === "admin") {
    return false;
  }
  return true;
};
