import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Message, Response } from '../../Interfaces/response.interface';

const URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private http = inject(HttpClient);

  public messages = signal<Message[] | null>(null);

  async sendMessage(recipient: string, title: string, body: string, type: string): Promise<Observable<Response>>{
    const formData = new FormData;
    formData.append('destinatario', recipient);
    formData.append('titulo', title);
    formData.append('contenido', body);
    formData.append('tipo', type);

    const url = `${ URL }/db/message/send.php`

    return this.http.post<Response>(url, formData, { withCredentials: true });
  }

  getMessages() {
    const url = `${ URL }/db/message/messages.php`
    this.http.get<Response>(url, { withCredentials: true })
      .subscribe(( res: Response ) => {
        this.messages.set( [ ...res.mensajes! ] )
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
    const formData = new FormData;
    formData.append('idMessage', idMessage);

    const url = `${ URL }/db/message/readMessage.php`
    this.http.post<Response>(url, formData, { withCredentials: true })
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
  }
}
