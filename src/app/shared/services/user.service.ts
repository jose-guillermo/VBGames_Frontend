import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, User } from '../Interfaces/response.interface';
import { Router } from '@angular/router';
import { DataLocalService } from './data-local.service';

const URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private dataLocal = inject(DataLocalService);

  public user = signal<User | null>( null );
  // public user = signal<User | null>( {
  //   id: '12345',
  //   userName: 'JohnDoe',
  //   email: 'johndoe@example.com',
  //   rol: 'user',
  //   coins: 500,
  //   creationDate: new Date(), // Fecha actual
  //   favouriteGame: 'Chess',
  // });

  constructor() {
    this.userInit();
  }

  createUser(userName: string, email: string, password: string): Observable<Response>{
    const formData = new FormData;
    formData.append('nombre_usuario', userName);
    formData.append('email', email);
    formData.append('password', password);

    const url = `${ URL }/db/user/create.php`

    return this.http.post<Response>(url, formData, { withCredentials: true });
  }

  login (email: string, password: string): Observable<Response>{
    const formData = new FormData;
    formData.append('email', email);
    formData.append('password', password);

    const url = `${ URL }/db/user/login.php`
    // const url = `${ URL }/session/createSession.php`

    return this.http.post<Response>(url, formData, { withCredentials: true });
  }

  logout(): Observable<Response> {
    this.user.set(null);
    this.dataLocal.deleteKey("user");
    this.router.navigate(['home']);
    return this.http.post<Response>(`${URL}/session/destroySession.php`, {}, { withCredentials: true });
  }

  userInit() {
    this.dataLocal.getValue("user").then((user: User) => {
      if(user)
        this.user.set(user);
    });
  }

  getUser():Observable<Response> {
    const url = `${ URL }/db/user/user.php`

    return this.http.get<Response>( url, { withCredentials: true } )
  }

}
