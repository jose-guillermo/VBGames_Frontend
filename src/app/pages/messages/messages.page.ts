import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonTitle, IonLabel, IonList, IonItem, IonButton, IonIcon, ModalController, AnimationController, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Message } from 'src/app/shared/Interfaces/response.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { MessagesService } from '../../shared/services/messages.service';
import { addIcons } from 'ionicons';
import { trashBin, chatbubbles, mail } from 'ionicons/icons';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { AnimationService } from '../../shared/services/animation.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonButton, IonItem, IonList, IonLabel,  CommonModule, FormsModule, TranslatePipe, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export default class MessagesPage {

  private messagesService = inject(MessagesService);
  private modalCtrl = inject(ModalController);
  private animationService = inject(AnimationService);

  // public messages = computed<Message[] | null>(() => this.messagesService.messages()!)
  // public messages = signal<Message[] | null>(null);

  public messages = signal<Message[]>([
    {
      id: "mensaje1",
      sender: "Ana",
      recipient: "Carlos",
      creationDate: new Date('2024-12-01'),
      title: "Solicitud de amistad",
      read: false,
      body: "¡Hola Carlos! Me gustaría agregarlo como amigo. ¿Aceptas mi solicitud?",
      type: "FRIEND_REQUEST"
    },
    {
      id: "mensaje2",
      sender: "Carlos",
      recipient: "Ana",
      creationDate: new Date('2024-12-02'),
      title: "Desafío de ajedrez",
      read: false,
      body: "¡Te reto a una partida de ajedrez! ¿Te atreves?",
      type: "GAME_CHALLENGE"
    },
    {
      id: "mensaje4",
      sender: "Carlos",
      recipient: "Ana",
      creationDate: new Date('2024-12-03'),
      title: "Nuevo logro desbloqueado",
      read: true,
      body: "¡Felicidades! Has desbloqueado un nuevo logro en el juego. ¡Sigue así!",
      type: "ACHIEVEMENT_UNLOCKED"
    },
    {
      id: "mensaje5",
      sender: "Sistema",
      recipient: "Ana",
      creationDate: new Date('2024-12-05'),
      title: "Promoción en la tienda",
      read: true,
      body: "¡Atención! Hay una nueva promoción en la tienda. Visítanos para obtener tus descuentos.",
      type: "STORE_PROMOTION"
    }
  ])

  constructor() {
    addIcons({mail,trashBin,chatbubbles});
  }

  async showMessage(message: Message, i: number, previous: boolean | null = null) {
    let disablePrevious = false;
    let disableNext = false;

    if (i === 0)
      disablePrevious = true;

    if(i === this.messages()!.length - 1)
      disableNext = true;

    let modal = null
    if(previous) {
      modal = await this.modalCtrl.create({
        component: MessageComponent,
        componentProps: {
          message: message,
          index: i,
          disableNext,
          disablePrevious
        },
        enterAnimation: this.animationService.enterAnimationLeft,
        leaveAnimation: this.animationService.leaveAnimation,
      });
    } else if (previous === false) {
      modal = await this.modalCtrl.create({
        component: MessageComponent,
        componentProps: {
          message: message,
          index: i,
          disableNext,
          disablePrevious
        },
        enterAnimation: this.animationService.enterAnimationRight,
        leaveAnimation: this.animationService.leaveAnimation,
      });
    } else {
      modal = await this.modalCtrl.create({
        component: MessageComponent,
        componentProps: {
          message: message,
          index: i,
          disableNext,
          disablePrevious
        },
        enterAnimation: this.animationService.enterAnimation,
        leaveAnimation: this.animationService.leaveAnimation,
      });
    }


    modal.onDidDismiss().then( async (result) => {
      if (result.data){
        const data = result.data;  // Aquí obtienes el valor emitido desde el modal
        if (data.index !== null)
          this.showMessage(this.messages()![data.index], data.index, data.previous);
      }
    })

    await modal.present();
  }

  deleteMessage( id: string ) {
    this.messagesService.deleteMessage(id);
  }
}
