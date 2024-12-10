import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message, Response } from '../Interfaces/response.interface';
import { Observable } from 'rxjs';
import { DataLocalService } from './data-local.service';

const URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private http = inject(HttpClient);
  private dataLocal = inject(DataLocalService)

  public messages = signal<Message[] | null>(null);

  async sendMessage(recipient: string, title: string, body: string, type: string): Promise<Observable<Response>>{
    this.dataLocal.getValue("jwt").then((jwt) => {
      const headers = new HttpHeaders({
        "Jwt": jwt,
      })
      const formData = new FormData;

      formData.append('destinatario', recipient);
      formData.append('titulo', title);
      formData.append('contenido', body);
      formData.append('tipo', type);

      const url = `${ URL }/db/message/send.php`

      return this.http.post<Response>(url, formData, { headers });
    }).catch(() => {

    })
    return new Observable((observer) => {
      const res: Response = {
        exito: false,
      }
      observer.next(res);
      observer.complete();
    })

  }

  getMessages() {
    this.dataLocal.getValue("jwt").then((jwt) => {
      const headers = new HttpHeaders({
        "Jwt": jwt,
      })
      const url = `${ URL }/db/message/messages.php`
      this.http.get<Response>(url, {headers})
        .subscribe(( res: Response ) => {
          this.messages.set( [ ...res.mensajes! ] )
        })
    })

  }

  deleteMessage(idMessage: string) {
    const url = `${ URL }/db/message/delete.php`
    this.http.delete<Response>(url, {
      params: { "id": idMessage },
      withCredentials: true
    })
      .subscribe(( res: Response ) => {
        this.messages.set( [ ...res.mensajes! ] )
      })
  }

  markReadMessage(idMessage: string) {
    this.dataLocal.getValue("jwt").then((jwt) => {
      const headers = new HttpHeaders({
        "Jwt": jwt,
      })

      const formData = new FormData;
      formData.append('idMessage', idMessage);

      const url = `${ URL }/db/message/readMessage.php`
      this.http.post<Response>(url, formData, {headers})
        .subscribe(( res: Response ) => {
          if (res.exito){
            this.messages.update((messages) => {
              const message = messages?.find(msg => msg.id == idMessage);

              if(message)
                message.read = true;

              return messages;
            })
          }
        })
    })

  }
}
