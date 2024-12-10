import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Message } from '../../Interfaces/response.interface';
import { ModalController, IonTitle, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonCard, IonCardHeader, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { MessagesService } from '../../services/messages.service';
import { DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowBackOutline, arrowForwardOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [IonIcon, IonCardContent, IonCardHeader, IonCard, IonContent, IonButton, IonButtons, IonToolbar, IonHeader, IonTitle, TranslatePipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MessageComponent  implements OnInit {

  private modalCtrl = inject(ModalController);
  private messageService = inject(MessagesService);

  @Input({required: true}) message: Message | null = null;
  @Input({required: true}) index: number = 0;
  @Input({required: true}) disablePrevious: boolean = false;
  @Input({required: true}) disableNext: boolean = false;
  @Output() modalNextPrevious = new EventEmitter<string>();

  constructor() {
    addIcons({arrowBackOutline,add,arrowForwardOutline});
  }

  ngOnInit() {
    // this.messageService.markReadMessage(this.message()!.id);
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      nombre: "Jose",
      pais: "España",
    });
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  previous() {
    return this.modalCtrl.dismiss({ index: this.index - 1, previous: true});
  }

  next() {
    return this.modalCtrl.dismiss({ index: this.index + 1, previous: false});
  }

}
